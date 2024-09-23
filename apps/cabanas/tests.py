from django.test import TestCase
from .models import Cabana

class CabanaModelTest(TestCase):
    def test_crear_cabana(self):
        cabana = Cabana.objects.create(nombre='Cabana Test', capacidad=4)
        self.assertEqual(cabana.nombre, 'Cabana Test')
