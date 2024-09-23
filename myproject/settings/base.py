import os
from pathlib import Path

# Ruta base del proyecto
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# Clave secreta utilizada para la encriptación
SECRET_KEY = os.getenv('SECRET_KEY', 'clave-secreta-segura')

# Configuración de Aplicaciones Instaladas
INSTALLED_APPS = [
    'django.contrib.admin',          # Panel de administración
    'django.contrib.auth',           # Sistema de autenticación
    'django.contrib.contenttypes',   # Content types para permisos y más
    'django.contrib.sessions',       # Manejo de sesiones
    'django.contrib.messages',       # Sistema de mensajes
    'django.contrib.staticfiles',    # Manejo de archivos estáticos
    # Apps personalizadas
    'apps.usuarios',                 # App de gestión de usuarios
    'apps.cabanas',                  # App de gestión de cabañas
    'apps.actividades',              # App de gestión de actividades
    'apps.reservas',                 # App de gestión de reservas
]

# Middleware que procesa cada petición/respuesta
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',    # Seguridad básica
    'django.contrib.sessions.middleware.SessionMiddleware', # Manejo de sesiones
    'django.middleware.common.CommonMiddleware',        # Configuración general de middleware
    'django.middleware.csrf.CsrfViewMiddleware',        # Protección contra CSRF
    'django.contrib.auth.middleware.AuthenticationMiddleware', # Manejo de autenticación
    'django.contrib.messages.middleware.MessageMiddleware', # Manejo de mensajes
    'django.middleware.clickjacking.XFrameOptionsMiddleware', # Prevención de Clickjacking
]

# Configuración de URLs raíz
ROOT_URLCONF = 'myproject.urls'

# Configuración de plantillas
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Sistema de WSGI para despliegue
WSGI_APPLICATION = 'myproject.wsgi.application'

# Configuración de la base de datos (se especifica en development y production)
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


# Configuración de contraseñas (función hash)
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'OPTIONS': {'min_length': 8},
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Configuración Internacional
LANGUAGE_CODE = 'es-es'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Configuración de archivos estáticos
STATIC_URL = '/static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]

# Configuración de archivos media (subidos por usuarios)
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Configuración de correos (se detalla en development y production)
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# Listas de seguridad y otros ajustes opcionales que se pueden agregar:
X_FRAME_OPTIONS = 'DENY'  # Prevención de Clickjacking
SECURE_BROWSER_XSS_FILTER = True  # Protección contra XSS
