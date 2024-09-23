from django.db import models

class Usuario(models.Model):
    nombre_usuario = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)
    contrasena = models.CharField(max_length=255)
    tipo_usuario = models.CharField(max_length=10, choices=[
        ('cliente', 'Cliente'),
        ('arrendador', 'Arrendador'),
        ('admin', 'Administrador')
    ])

    def __str__(self):
        return self.nombre_usuario


class Persona(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, null=True, blank=True)
    nombre = models.CharField(max_length=255)
    apellido = models.CharField(max_length=255)
    dni = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return f"{self.nombre} {self.apellido}"


class Arrendador(models.Model):
    persona = models.OneToOneField(Persona, on_delete=models.CASCADE, primary_key=True)

    def __str__(self):
        return f"Arrendador: {self.persona.nombre} {self.persona.apellido}"

class Cliente(models.Model):
    persona = models.OneToOneField(Persona, on_delete=models.CASCADE, primary_key=True)

    def __str__(self):
        return f"Cliente: {self.persona.nombre} {self.persona.apellido}"
