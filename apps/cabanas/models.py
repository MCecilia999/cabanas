from django.db import models
from apps.usuarios.models import Arrendador

class Cabana(models.Model):
    arrendador = models.ForeignKey(Arrendador, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=255)
    capacidad = models.IntegerField()
    costo_por_noche = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.nombre
