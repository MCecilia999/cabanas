import os

# Obtener el entorno de Django desde una variable de entorno
ENVIRONMENT = os.getenv('DJANGO_ENV', 'development')  # 'development' es el valor por defecto

# Importar las configuraciones correspondientes
if ENVIRONMENT == 'production':
    from .production import *
elif ENVIRONMENT == 'development':
    from .development import *
else:
    raise ValueError(f"Entorno no reconocido: {ENVIRONMENT}. Use 'development' o 'production'.")
