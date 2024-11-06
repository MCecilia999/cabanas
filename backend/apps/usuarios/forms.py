# apps/usuarios/forms.py
from django import forms
from .models import Usuario, Persona
from django.core.exceptions import ValidationError

class PersonaForm(forms.ModelForm):
    class Meta:
        model = Persona
        fields = ['id_usuario', 'nombre', 'apellido', 'dni']
        widgets = {
            'dni': forms.TextInput(attrs={'required': False}),
        }