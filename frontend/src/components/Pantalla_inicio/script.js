let currentImageIndex = 0;
const images = [
    'img/cabaña1/img1.jpg',
    'img/cabaña1/img2.jpg',
    'img/cabaña1/img3.jpg',
    'img/cabaña1/img4.jpg',
    'img/cabaña1/img5.jpg',
    'img/cabaña1/img6.jpg'
];

function changeImage(index) {
    currentImageIndex = index;
    updateImage();
    updateThumbnails();
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateImage();
    updateThumbnails();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateImage();
    updateThumbnails();
}

function updateImage() {
    const mainImage = document.getElementById('mainImage');
    mainImage.src = images[currentImageIndex];
}

function updateThumbnails() {
    const thumbs = document.querySelectorAll('.thumb');
    thumbs.forEach((thumb, index) => {
        if (index === currentImageIndex) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

// Calcular precio total
function calculateTotal() {
    const checkIn = new Date(document.getElementById('checkIn').value);
    const checkOut = new Date(document.getElementById('checkOut').value);
    
    if (checkIn && checkOut) {
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        const pricePerNight = 7699;
        const subtotal = nights * pricePerNight;
        const cleaningFee = 912;
        const serviceFee = Math.round(subtotal * 0.15); // 15% de tarifa de servicio
        const total = subtotal + cleaningFee + serviceFee;
        
        // Actualizar los elementos en el DOM
        document.querySelector('.price-breakdown').innerHTML = `
            <div class="price-row">
                <span>$${pricePerNight} MXN x ${nights} noches</span>
                <span>$${subtotal} MXN</span>
            </div>
            <div class="price-row">
                <span>Tarifa de limpieza</span>
                <span>$${cleaningFee} MXN</span>
            </div>
            <div class="price-row">
                <span>Tarifa de servicio</span>
                <span>$${serviceFee} MXN</span>
            </div>
            <div class="price-row total">
                <span>Total antes de impuestos</span>
                <span>$${total} MXN</span>
            </div>
        `;
    }
}

// Event Listeners
document.getElementById('checkIn').addEventListener('change', calculateTotal);
document.getElementById('checkOut').addEventListener('change', calculateTotal);

// Inicializar la página
document.addEventListener('DOMContentLoaded', function() {
    updateThumbnails();
});