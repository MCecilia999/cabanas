from django.db import models
from apps.usuarios.models import Arrendador

class Actividad(models.Model):
    arrendador = models.ForeignKey(Arrendador, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()
    costo = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.nombre


class Paquete(models.Model):
    arrendador = models.ForeignKey(Arrendador, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=255)
    noches = models.IntegerField(null=True, blank=True)
    precio_base = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.nombre


from apps.cabanas.models import Cabana

class PaqueteCabana(models.Model):
    paquete = models.ForeignKey(Paquete, on_delete=models.CASCADE)
    cabana = models.ForeignKey(Cabana, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('paquete', 'cabana')

    def __str__(self):
        return f"{self.paquete.nombre} - {self.cabana.nombre}"

from apps.actividades.models import Actividad

class PaqueteActividad(models.Model):
    paquete = models.ForeignKey(Paquete, on_delete=models.CASCADE)
    actividad = models.ForeignKey(Actividad, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('paquete', 'actividad')

    def __str__(self):
        return f"{self.paquete.nombre} - {self.actividad.nombre}"
