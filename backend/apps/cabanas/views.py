#apps/cabanas/views.py
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Cabana
from .forms import CabanaForm

@login_required
def agregar_cabana(request):
    if request.method == 'POST':
        form = CabanaForm(request.POST)
        if form.is_valid():
            cabana = form.save(commit=False)
            cabana.arrendador = request.user.persona.arrendador
            cabana.save()
            return redirect('lista_cabanas')
    else:
        form = CabanaForm()
    return render(request, 'cabanas/agregar_cabana.html', {'form': form})

def detalle_cabana(request, cabana_id):
    cabana = get_object_or_404(Cabana, id=cabana_id)
    return render(request, 'cabanas/detalle_cabana.html', {'cabana': cabana})

def lista_cabanas(request):
    cabanas = Cabana.objects.all()
    return render(request, 'cabanas/lista_cabanas.html', {'cabanas': cabanas})