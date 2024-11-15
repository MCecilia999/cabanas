# apps/cabanas/views.py
from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from .models import *
from .serializers import *
from .permissions import IsArrendadorOrReadOnly

class CabanaViewSet(viewsets.ModelViewSet):
    queryset = Cabana.objects.all()
    permission_classes = [IsArrendadorOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['ubicacion', 'capacidad', 'estado', 'es_destacada']
    search_fields = ['nombre', 'descripcion', 'ubicacion__nombre']
    ordering_fields = ['costo_por_noche', 'calificacion_promedio', 'creada_en']

    def get_serializer_class(self):
        if self.action == 'list':
            return CabanaListSerializer
        return CabanaDetailSerializer

    def perform_create(self, serializer):
        serializer.save(arrendador=self.request.user.arrendador)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def agregar_resena(self, request, pk=None):
        cabana = self.get_object()
        serializer = ResenaSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save(
                cabana=cabana,
                usuario=request.user
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'])
    def disponibilidad(self, request, pk=None):
        cabana = self.get_object()
        fecha_inicio = request.query_params.get('fecha_inicio')
        fecha_fin = request.query_params.get('fecha_fin')
        
        disponibilidad = DisponibilidadCabana.objects.filter(
            cabana=cabana,
            fecha__range=[fecha_inicio, fecha_fin]
        )
        
        serializer = DisponibilidadCabanaSerializer(disponibilidad, many=True)
        return Response(serializer.data)

class UbicacionViewSet(viewsets.ModelViewSet):
    queryset = Ubicacion.objects.all()
    serializer_class = UbicacionSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class ServicioViewSet(viewsets.ModelViewSet):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
