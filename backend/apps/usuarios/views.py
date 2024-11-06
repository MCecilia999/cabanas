# apps/usuarios/views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .permissions import *
from .models import Usuario, Persona, Arrendador, Cliente
from .serializers import UsuarioSerializer, PersonaSerializer, ArrendadorSerializer, ClienteSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [RegistroPermission]
        elif self.action in ['update', 'partial_update', 'destroy']:
            permission_classes = [PropietarioOAdministrador]
        elif self.action == 'list':
            permission_classes = [EsAdministrador]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

class PersonaViewSet(viewsets.ModelViewSet):
    queryset = Persona.objects.all()
    serializer_class = PersonaSerializer
    permission_classes = [PersonaPermission]

    def get_queryset(self):
        if self.request.user.tipo_usuario == 'admin':
            return Persona.objects.all()
        return Persona.objects.filter(id_usuario=self.request.user)

class ArrendadorViewSet(viewsets.ModelViewSet):
    queryset = Arrendador.objects.all()
    serializer_class = ArrendadorSerializer
    permission_classes = [ArrendadorPermission]

    def get_queryset(self):
        if self.request.user.tipo_usuario == 'admin':
            return Arrendador.objects.all()
        elif self.request.user.tipo_usuario == 'arrendador':
            return Arrendador.objects.filter(
                id_arrendador__id_usuario=self.request.user
            )
        return Arrendador.objects.none()

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    permission_classes = [ClientePermission]

    def get_queryset(self):
        if self.request.user.tipo_usuario == 'admin':
            return Cliente.objects.all()
        elif self.request.user.tipo_usuario == 'cliente':
            return Cliente.objects.filter(
                id_cliente__id_usuario=self.request.user
            )
        return Cliente.objects.none()