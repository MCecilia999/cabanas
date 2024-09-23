from django.shortcuts import render
from .models import Actividad

def listar_actividades(request):
    actividades = Actividad.objects.all()
    return render(request, 'actividades/list.html', {'actividades': actividades})
