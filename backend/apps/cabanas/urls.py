from django.urls import path
from . import views

urlpatterns = [
    path('agregar/', views.agregar_cabana, name='agregar_cabana'),
    path('<int:cabana_id>/', views.detalle_cabana, name='detalle_cabana'),
    path('', views.lista_cabanas, name='lista_cabanas'),
]