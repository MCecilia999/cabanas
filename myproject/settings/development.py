from .base import *

# Activar modo de depuración
DEBUG = True

# Hosts permitidos en desarrollo
ALLOWED_HOSTS = ['localhost', '127.0.0.1']

# Configuración de base de datos para desarrollo (usualmente SQLite o base local)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',  # Especifica que se usará MySQL
        'NAME': 'bd_cabanas_dj',               # Nombre de la base de datos
        'USER': 'root',                        # Usuario de la base de datos
        'PASSWORD': '2014',                    # Contraseña del usuario
        'HOST': 'localhost',                   # Host donde se encuentra la base de datos
        'PORT': '3306',                        # Puerto de MySQL, el predeterminado es 3306
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'"  # Configura el modo estricto
        }
    }
}


# Backend de correo para desarrollo (muestra los correos en la consola)
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# Configuraciones adicionales de desarrollo
INSTALLED_APPS += [
    'debug_toolbar',  # Herramienta para depuración detallada de Django
]

MIDDLEWARE += [
    'debug_toolbar.middleware.DebugToolbarMiddleware',  # Middleware de la barra de depuración
]

# Mostrar panel de depuración solo para IPs locales
INTERNAL_IPS = ['127.0.0.1']
