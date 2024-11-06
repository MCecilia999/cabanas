document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const menuItems = document.querySelectorAll('.menu-item');

    // Función para cerrar todos los submenús
    function closeAllSubmenus() {
        menuItems.forEach(item => {
            const submenu = item.querySelector('.submenu');
            if (submenu) {
                submenu.style.display = 'none';
            }
        });
    }

    // Evento para mostrar/ocultar submenús al hacer hover
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            closeAllSubmenus();
            const submenu = this.querySelector('.submenu');
            if (submenu) {
                submenu.style.display = 'block';
            }
        });

        item.addEventListener('mouseleave', function() {
            const submenu = this.querySelector('.submenu');
            if (submenu) {
                submenu.style.display = 'none';
            }
        });
    });

    // Cerrar submenús al hacer clic fuera del sidebar
    document.addEventListener('click', function(e) {
        if (!sidebar.contains(e.target)) {
            closeAllSubmenus();
        }
    });

    // Manejo de responsive
    if (window.innerWidth <= 768) {
        sidebar.classList.add('collapsed');
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            sidebar.classList.add('collapsed');
        } else {
            sidebar.classList.remove('collapsed');
        }
    });
});