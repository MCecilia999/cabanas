#!/usr/bin/env python
import os
import sys

def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')  # Cambia 'myproject' por el nombre de tu proyecto
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "No se puede importar Django. Asegúrate de que esté instalado y disponible en tu PYTHONPATH."
            " También asegúrate de que hayas activado tu entorno virtual si lo estás usando."
        ) from exc
    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    main()
