from django.test import TestCase
from .models import Usuario

class UsuarioModelTest(TestCase):
    def test_crear_usuario(self):
        # Prueba para crear un usuario
        usuario = Usuario.objects.create(nombre_usuario='testuser')
        self.assertEqual(usuario.nombre_usuario, 'testuser')
