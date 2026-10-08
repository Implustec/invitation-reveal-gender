// Cuenta regresiva
const eventDate = new Date("August 15, 2026 16:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = String(days).padStart(2, '0');
    document.getElementById("hours").innerText = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Votación Interactiva
let boyVotes = 14;
let girlVotes = 18;
function vote(team) {
    if(team === 'boy') {
        boyVotes++;
        document.getElementById('boyCount').innerText = boyVotes + ' votos';
        showToast('fa-mars', '¡Votaste por Team Boy!');
    } else {
        girlVotes++;
        document.getElementById('girlCount').innerText = girlVotes + ' votos';
        showToast('fa-venus', '¡Votaste por Team Girl!');
    }
}

// Notificaciones Toast
function showToast(iconClass, message) {
    const toast = document.getElementById("toast");
    const toastText = document.getElementById("toastText");
    const toastIcon = document.getElementById("toastIcon");

    toastIcon.className = `fa-solid ${iconClass}`;
    toastText.innerText = message;

    toast.className = "show";
    setTimeout(function(){ 
        toast.className = toast.className.replace("show", ""); 
    }, 3000);
}

// Música
let isPlaying = false;
function toggleMusic() {
    isPlaying = !isPlaying;
    const icon = document.getElementById("musicIcon");
    if (isPlaying) {
        icon.className = "fa-solid fa-volume-high";
        showToast("fa-volume-high", "Música ambiental activada.");
    } else {
        icon.className = "fa-solid fa-music";
        showToast("fa-music", "Música ambiental pausada.");
    }
}

// RSVP Handler
function handleRSVP(event) {
    event.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const asistentes = document.getElementById("asistentes").value;

    document.getElementById("successMessageText").innerHTML = `¡Gracias <strong>${nombre}</strong>! Tus <strong>${asistentes} lugares</strong> están confirmados. ¡Nos vemos en la revelación!`;

    document.getElementById("rsvpForm").style.display = "none";
    document.getElementById("successCard").style.display = "block";
    showToast("fa-circle-check", "¡Asistencia confirmada!");
}

function resetForm() {
    document.getElementById("rsvpForm").reset();
    document.getElementById("successCard").style.display = "none";
    document.getElementById("rsvpForm").style.display = "flex";
    showToast("fa-rotate-right", "Puedes modificar tus datos.");
}

// Dinamismo de Fondo (Partículas Cian y Magenta)
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.2 + 0.8;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.color = Math.random() > 0.5 ? 'rgba(0, 242, 254, 0.6)' : 'rgba(255, 42, 141, 0.6)';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
        if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    let count = (canvas.width * canvas.height) / 10000;
    for (let i = 0; i < count; i++) {
        particlesArray.push(new Particle());
    }
}
initParticles();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
}
animate();