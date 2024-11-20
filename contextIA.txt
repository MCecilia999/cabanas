from rest_framework import serializers
from .models import (
    Cabana, Ubicacion, Servicio, ImagenCabana, 
    Resena, DisponibilidadCabana, PoliticaCabana
)

class UbicacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ubicacion
        fields = '__all__'

class ServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = '__all__'

class ImagenCabanaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagenCabana
        fields = ['id', 'imagen', 'es_principal', 'orden', 'titulo']

class ResenaSerializer(serializers.ModelSerializer):
    nombre_usuario = serializers.SerializerMethodField()

    class Meta:
        model = Resena
        fields = ['id', 'usuario', 'nombre_usuario', 'calificacion', 
                 'comentario', 'fecha_estadia', 'creada_en']
        read_only_fields = ['usuario']

    def get_nombre_usuario(self, obj):
        return f"{obj.usuario.first_name} {obj.usuario.last_name}"

class DisponibilidadCabanaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DisponibilidadCabana
        fields = '__all__'

class PoliticaCabanaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PoliticaCabana
        fields = '__all__'

class CabanaDetailSerializer(serializers.ModelSerializer):
    ubicacion = UbicacionSerializer(read_only=True)
    servicios = ServicioSerializer(many=True, read_only=True)
    imagenes = ImagenCabanaSerializer(many=True, read_only=True)
    resenas = ResenaSerializer(many=True, read_only=True)
    politicas = PoliticaCabanaSerializer(many=True, read_only=True)
    
    class Meta:
        model = Cabana
        fields = '__all__'
        read_only_fields = ['calificacion_promedio', 'num_resenas', 
                           'veces_reservada', 'slug']

class CabanaListSerializer(serializers.ModelSerializer):
    imagen_principal = serializers.SerializerMethodField()
    ubicacion_nombre = serializers.CharField(source='ubicacion.nombre')
    
    class Meta:
        model = Cabana
        fields = ['id', 'nombre', 'slug', 'descripcion_corta', 'capacidad',
                 'costo_por_noche', 'calificacion_promedio', 'imagen_principal',
                 'ubicacion_nombre', 'es_destacada', 'estado']

    def get_imagen_principal(self, obj):
        imagen_principal = obj.imagenes.filter(es_principal=True).first()
        if imagen_principal:
            return imagen_principal.imagen.url
        return None
