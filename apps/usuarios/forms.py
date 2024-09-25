# apps/usuarios/forms.py

from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import Usuario

class LoginForm(forms.Form):
    nombre_usuario = forms.CharField(max_length=255)
    contrasena = forms.CharField(widget=forms.PasswordInput)

class RegistroForm(UserCreationForm):
    class Meta:
        model = Usuario
        fields = ['nombre_usuario', 'email', 'tipo_usuario', 'password1', 'password2']
