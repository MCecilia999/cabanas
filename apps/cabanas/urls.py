from django.urls import path
from . import views

urlpatterns = [
    path('list/', views.listar_cabanas, name='listar_cabanas'),
]
