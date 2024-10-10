#apps/usuarios/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Usuario, Persona, Arrendador, Cliente

@receiver(post_save, sender=Usuario)
def crear_persona(sender, instance, created, **kwargs):
    if created:
        # Crear la persona para el usuario recién creado
        persona = Persona.objects.create(usuario=instance, nombre=instance.nombre_usuario, apellido='Apellido por defecto')

        # Dependiendo del tipo de usuario, crear Arrendador o Cliente
        if instance.tipo_usuario == 'arrendador':
            Arrendador.objects.create(persona=persona)
        elif instance.tipo_usuario == 'cliente':
            Cliente.objects.create(persona=persona)

@receiver(post_save, sender=Usuario)
def guardar_persona(sender, instance, **kwargs):
    if instance.persona:
        instance.persona.save()

@receiver(post_save, sender=Usuario)
def crear_o_actualizar_persona(sender, instance, created, **kwargs):
    if created:
        # Crear la persona para el usuario recién creado
        persona = Persona.objects.create(
            usuario=instance,
            nombre=instance.nombre_usuario,
            apellido='Apellido por defecto'
        )
    else:
        # Asegurarse de que el usuario existente tenga una persona asociada
        persona, created = Persona.objects.get_or_create(
            usuario=instance,
            defaults={'nombre': instance.nombre_usuario, 'apellido': 'Apellido por defecto'}
        )

    # Actualizar o crear Arrendador o Cliente
    if instance.tipo_usuario == 'arrendador':
        Arrendador.objects.get_or_create(persona=persona)
    elif instance.tipo_usuario == 'cliente':
        Cliente.objects.get_or_create(persona=persona)

# No es necesario el segundo signal (guardar_persona) ya que lo manejamos todo en el primero
