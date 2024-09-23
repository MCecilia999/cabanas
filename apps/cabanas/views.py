from django.shortcuts import render
from .models import Cabana

def listar_cabanas(request):
    cabanas = Cabana.objects.all()
    return render(request, 'cabanas/list.html', {'cabanas': cabanas})
