# myproject/urls.py
from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from apps.usuarios.views import home  # Importa la vista


urlpatterns = [
    path('admin/', admin.site.urls),
    # Agrega otras URLs principales aquí, como las de tus apps
    path('usuarios/', include('apps.usuarios.urls')),
    path('cabanas/', include('apps.cabanas.urls')),
    path('actividades/', include('apps.actividades.urls')),
    path('reservas/', include('apps.reservas.urls')),
    path('', home, name='home'),  # Ruta para la página principal

]

# Incluir Debug Toolbar solo si DEBUG es True
if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [
        path('__debug__/', include(debug_toolbar.urls)),  # Añade esta línea
    ]
