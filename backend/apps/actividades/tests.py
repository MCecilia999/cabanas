from django.test import TestCase
from .models import Actividad

class ActividadModelTest(TestCase):
    def test_crear_actividad(self):
        actividad = Actividad.objects.create(nombre='Actividad Test', descripcion='Desc')
        self.assertEqual(actividad.nombre, 'Actividad Test')
