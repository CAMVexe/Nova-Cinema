// ─── ESTRELLAS INTERACTIVAS ───────────────────────────────────────────────────
const stars = document.querySelectorAll(".star");
const ratingText = document.getElementById("ratingText");
let selectedRating = 0; // guarda la calificación que el usuario eligió

// Pinta N estrellas de color dorado y el resto en gris
function highlightStars(count) {
    stars.forEach(star => {
        const val = parseInt(star.dataset.value);
        star.style.color = val <= count ? "#f5a623" : "#ccc";
    });
}

stars.forEach(star => {
    // Al pasar el mouse, muestra una vista previa
    star.addEventListener("mouseover", () => {
        highlightStars(parseInt(star.dataset.value));
    });

    // Al salir el mouse, vuelve a mostrar la selección actual
    star.addEventListener("mouseout", () => {
        highlightStars(selectedRating);
    });

    // Al hacer clic, guarda la calificación definitiva
    star.addEventListener("click", () => {
        selectedRating = parseInt(star.dataset.value);
        ratingText.textContent = `${selectedRating} de 5 estrellas`;
    });
});


// ─── MENÚ HAMBURGUESA (para la navbar reutilizada de index) ───────────────────
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });
}


// ─── FORMULARIO DE RESEÑAS ────────────────────────────────────────────────────
const reviewForm = document.getElementById("reviewForm");
const commentsList = document.getElementById("commentsList");
const messageEl = document.getElementById("message");

reviewForm.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nombre = document.getElementById("userNameReview").value.trim();
    const pelicula = document.getElementById("movieSelect").value;
    const comentario = document.getElementById("commentText").value.trim();

    // Validación: todos los campos son obligatorios
    if (!nombre || !pelicula || selectedRating === 0 || !comentario) {
        messageEl.textContent = "Por favor completa todos los campos.";
        messageEl.style.color = "#ff6b6b";
        return;
    }

    // Crear el elemento del comentario
    const commentItem = document.createElement("div");
    commentItem.classList.add("comment-item");
    commentItem.innerHTML = `
        <strong>${nombre}</strong> — <em>${pelicula}</em>
        <div class="stars-display">${"★".repeat(selectedRating)}${"☆".repeat(5 - selectedRating)}</div>
        <p>${comentario}</p>
    `;

    // Si existe el mensaje de "sin comentarios", eliminarlo antes de añadir el primero
    const emptyMsg = commentsList.querySelector(".empty-comment");
    if (emptyMsg) emptyMsg.remove();

    commentsList.appendChild(commentItem);

    // Resetear el formulario
    reviewForm.reset();
    selectedRating = 0;
    highlightStars(0);
    ratingText.textContent = "Selecciona una calificación";

    messageEl.textContent = "¡Crítica publicada con éxito!";
    messageEl.style.color = "#90ee90";

    // Limpiar el mensaje de éxito después de 3 segundos
    setTimeout(() => {
        messageEl.textContent = "";
    }, 3000);
});