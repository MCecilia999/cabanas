from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'cabanas', views.CabanaViewSet)
router.register(r'ubicaciones', views.UbicacionViewSet)
router.register(r'servicios', views.ServicioViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
