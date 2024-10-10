# apps/usuarios/forms.py

from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import Usuario

class LoginForm(forms.Form):
    email = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput)

class RegistroForm(UserCreationForm):
    nombre = forms.CharField(max_length=255)
    apellido = forms.CharField(max_length=255)
    dni = forms.CharField(max_length=20, required=False)

    class Meta:
        model = Usuario
        fields = ['email', 'nombre_usuario', 'password1', 'password2', 'tipo_usuario', 'nombre', 'apellido', 'dni']

    def clean_dni(self):
        dni = self.cleaned_data.get('dni')
        if dni == '':
            return None
        return dni