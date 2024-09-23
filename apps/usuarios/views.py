from django.shortcuts import render
from django.contrib.auth import authenticate, login
from .models import Usuario
# apps/usuarios/views.py
from django.http import HttpResponse

def home(request):
    return HttpResponse("Bienvenido a la página principal")

def register_user(request):
    # Lógica para registrar un usuario
    return render(request, 'usuarios/register.html')
