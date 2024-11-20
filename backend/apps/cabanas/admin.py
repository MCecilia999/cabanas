# apps/cabanas/admin.py
from django.contrib import admin
from .models import Cabana, Ubicacion, Servicio, ImagenCabana, Resena
from apps.usuarios.models import Arrendador, Usuario

class CabanaAdmin(admin.ModelAdmin):
    # Campos a mostrar en la lista de Cabañas
    list_display = ['nombre', 'arrendador', 'capacidad', 'estado']
    
    # Campos para filtrar en la vista de lista
    list_filter = ['estado', 'arrendador']
    
    # Campos para buscar
    search_fields = ['nombre', 'arrendador__persona__nombre', 'arrendador__persona__apellido']

    # Método para filtrar y mostrar solo Arrendadores
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "arrendador":
            # Filtrar solo los arrendadores existentes
            kwargs["queryset"] = Arrendador.objects.all()
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

    def save_model(self, request, obj, form, change):
        # Si es una nueva cabaña, intentar asignar el arrendador del usuario actual
        if not change:
            try:
                # Intenta obtener el arrendador asociado al usuario actual
                obj.arrendador = request.user.persona.arrendador
            except (AttributeError, Arrendador.DoesNotExist):
                # Si no hay arrendador asociado, mostrar un mensaje o manejar el error
                from django.contrib import messages
                messages.warning(request, "No se pudo asignar automáticamente el arrendador.")
        
        # Guardar el modelo
        super().save_model(request, obj, form, change)

    # Personalizar los permisos para ver solo las cabañas del arrendador actual
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        
        # Si es superusuario, mostrar todas las cabañas
        if request.user.is_superuser:
            return qs
        
        # Intentar filtrar cabañas por el arrendador del usuario actual
        try:
            arrendador = request.user.persona.arrendador
            return qs.filter(arrendador=arrendador)
        except (AttributeError, Arrendador.DoesNotExist):
            # Si no es un arrendador, mostrar un conjunto vacío
            return qs.none()

# Registros de modelos en el admin
admin.site.register(Cabana, CabanaAdmin)
admin.site.register(Ubicacion)
admin.site.register(Servicio)
admin.site.register(ImagenCabana)
admin.site.register(Resena)