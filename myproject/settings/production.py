from .base import *

# Desactivar el modo de depuración para producción
DEBUG = False

# Hosts permitidos en producción
ALLOWED_HOSTS = ['tu_dominio.com', 'www.tu_dominio.com']

# Configuración de base de datos para producción (ej. PostgreSQL)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME', 'nombre_base_datos'),
        'USER': os.getenv('DB_USER', 'usuario'),
        'PASSWORD': os.getenv('DB_PASSWORD', 'contraseña'),
        'HOST': os.getenv('DB_HOST', 'localhost'),
        'PORT': os.getenv('DB_PORT', '5432'),
    }
}

# Backend de correo para producción (SMTP, SendGrid, etc.)
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = os.getenv('EMAIL_HOST', 'smtp.sendgrid.net')
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER', 'usuario')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD', 'contraseña')

# Medidas de seguridad adicionales
SECURE_SSL_REDIRECT = True                  # Redirige todas las peticiones a HTTPS
SESSION_COOKIE_SECURE = True                # Asegura la cookie de sesión solo por HTTPS
CSRF_COOKIE_SECURE = True                   # Protege la cookie CSRF por HTTPS
SECURE_HSTS_SECONDS = 31536000              # Habilita HSTS por un año
SECURE_HSTS_INCLUDE_SUBDOMAINS = True       # Habilita HSTS para subdominios
SECURE_HSTS_PRELOAD = True                  # Permite la precarga de HSTS
SECURE_BROWSER_XSS_FILTER = True            # Protección contra XSS
X_FRAME_OPTIONS = 'DENY'                    # Previene ataques de Clickjacking
