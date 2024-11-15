from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.text import slugify
from apps.usuarios.models import Arrendador, Usuario

class Ubicacion(models.Model):
    nombre = models.CharField(max_length=100)
    estado = models.CharField(max_length=50)
    ciudad = models.CharField(max_length=50)
    codigo_postal = models.CharField(max_length=10)
    latitud = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitud = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

    def __str__(self):
        return f"{self.nombre}, {self.ciudad}, {self.estado}"

class Servicio(models.Model):
    nombre = models.CharField(max_length=50)
    icono = models.CharField(max_length=50) 
    descripcion = models.TextField(blank=True)

    def __str__(self):
        return self.nombre

class Cabana(models.Model):
    ESTADO_CHOICES = [
        ('disponible', 'Disponible'),
        ('ocupada', 'Ocupada'),
        ('mantenimiento', 'En Mantenimiento'),
        ('inactiva', 'Inactiva'),
    ]

    # Campos básicos
    arrendador = models.ForeignKey(Arrendador, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    descripcion = models.TextField()
    descripcion_corta = models.CharField(max_length=200)
    
    # Capacidad y precios
    capacidad = models.IntegerField(validators=[MinValueValidator(1)])
    capacidad_maxima = models.IntegerField(validators=[MinValueValidator(1)])
    costo_por_noche = models.DecimalField(max_digits=10, decimal_places=2)
    costo_limpieza = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    deposito_garantia = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    # Ubicación y características
    ubicacion = models.ForeignKey(Ubicacion, on_delete=models.PROTECT)
    metros_cuadrados = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    num_habitaciones = models.IntegerField(default=1)
    num_banos = models.DecimalField(max_digits=3, decimal_places=1, default=1)
    
    # Servicios y amenidades
    servicios = models.ManyToManyField(Servicio)
    tiene_alberca = models.BooleanField(default=False)
    tiene_jacuzzi = models.BooleanField(default=False)
    acepta_mascotas = models.BooleanField(default=False)
    
    # Estado y configuración
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='disponible')
    es_destacada = models.BooleanField(default=False)
    check_in = models.TimeField(default='15:00')
    check_out = models.TimeField(default='11:00')
    tiempo_minimo_estadia = models.IntegerField(default=1)
    tiempo_maximo_estadia = models.IntegerField(null=True, blank=True)
    
    # Calificaciones y estadísticas
    calificacion_promedio = models.DecimalField(max_digits=3, decimal_places=2, default=0)
    num_resenas = models.IntegerField(default=0)
    veces_reservada = models.IntegerField(default=0)
    
    # Campos de auditoría
    creada_en = models.DateTimeField(auto_now_add=True)
    actualizada_en = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-es_destacada', '-calificacion_promedio']
        
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nombre)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.nombre

class ImagenCabana(models.Model):
    cabana = models.ForeignKey(Cabana, related_name='imagenes', on_delete=models.CASCADE)
    imagen = models.ImageField(upload_to='cabanas/')
    es_principal = models.BooleanField(default=False)
    orden = models.IntegerField(default=0)
    titulo = models.CharField(max_length=100, blank=True)
    creada_en = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['orden', 'creada_en']

class Resena(models.Model):
    cabana = models.ForeignKey(Cabana, related_name='resenas', on_delete=models.CASCADE)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    calificacion = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    comentario = models.TextField()
    fecha_estadia = models.DateField()
    creada_en = models.DateTimeField(auto_now_add=True)
    actualizada_en = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['cabana', 'usuario', 'fecha_estadia']
        ordering = ['-creada_en']

class DisponibilidadCabana(models.Model):
    cabana = models.ForeignKey(Cabana, related_name='disponibilidad', on_delete=models.CASCADE)
    fecha = models.DateField()
    esta_disponible = models.BooleanField(default=True)
    precio_especial = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    class Meta:
        unique_together = ['cabana', 'fecha']
        ordering = ['fecha']

class PoliticaCabana(models.Model):
    cabana = models.ForeignKey(Cabana, related_name='politicas', on_delete=models.CASCADE)
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField()
    orden = models.IntegerField(default=0)

    class Meta:
        ordering = ['orden']    