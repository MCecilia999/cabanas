from django.urls import path
from . import views

urlpatterns = [
    path('list/', views.listar_actividades, name='listar_actividades'),
]
