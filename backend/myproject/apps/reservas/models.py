from django.db import models

from apps.actividades.models import Paquete
from apps.actividades.models import Actividad
from apps.cabanas.models import Cabana
from apps.usuarios.models import Cliente

class Reserva(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    paquete = models.ForeignKey(Paquete, on_delete=models.SET_NULL, null=True, blank=True)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    precio_final = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField(max_length=10, choices=[
        ('pendiente', 'Pendiente'),
        ('confirmada', 'Confirmada'),
        ('cancelada', 'Cancelada')
    ], default='pendiente')

    def __str__(self):
        return f"Reserva: {self.cliente.persona.nombre} {self.cliente.persona.apellido}"



class ReservaCabana(models.Model):
    reserva = models.ForeignKey(Reserva, on_delete=models.CASCADE)
    cabana = models.ForeignKey(Cabana, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('reserva', 'cabana')

    def __str__(self):
        return f"Reserva {self.reserva.id} - {self.cabana.nombre}"


class ReservaActividad(models.Model):
    reserva = models.ForeignKey(Reserva, on_delete=models.CASCADE)
    actividad = models.ForeignKey(Actividad, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('reserva', 'actividad')

    def __str__(self):
        return f"Reserva {self.reserva.id} - {self.actividad.nombre}"