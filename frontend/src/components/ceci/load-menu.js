document.addEventListener('DOMContentLoaded', function() {
    fetch('menu_lateral.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('menu-lateral').innerHTML = data;
        })
        .catch(error => console.error('Error cargando el menú:', error));
});