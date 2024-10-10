from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from .forms import LoginForm, RegistroForm
from django.contrib import messages
from .models import Persona, Cliente, Arrendador
from django.db import transaction

@login_required
def home(request):
    return render(request, 'usuarios/home.html')

def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            user = authenticate(request, email=email, password=password)
            if user is not None:
                login(request, user)
                return redirect('home')
            else:
                messages.error(request, 'Email o contraseña incorrectos.')
    else:
        form = LoginForm()
    return render(request, 'usuarios/login.html', {'form': form})

def registro_view(request):
    if request.method == 'POST':
        form = RegistroForm(request.POST)
        if form.is_valid():
            with transaction.atomic():
                user = form.save()
                persona, created = Persona.objects.update_or_create(
                    usuario=user,
                    defaults={
                        'nombre': form.cleaned_data['nombre'],
                        'apellido': form.cleaned_data['apellido'],
                        'dni': form.cleaned_data.get('dni')
                    }
                )
                if user.tipo_usuario == 'cliente':
                    Cliente.objects.get_or_create(persona=persona)
                elif user.tipo_usuario == 'arrendador':
                    Arrendador.objects.get_or_create(persona=persona)
                login(request, user)
                messages.success(request, 'Registro exitoso. Bienvenido!')
                return redirect('home')
        else:
            messages.error(request, 'Ha ocurrido un error en el registro. Por favor, verifica los datos.')
    else:
        form = RegistroForm()
    return render(request, 'usuarios/registro.html', {'form': form})

def logout_view(request):
    logout(request)
    return redirect('login')

@login_required
def profile_view(request):
    return render(request, 'usuarios/profile.html')