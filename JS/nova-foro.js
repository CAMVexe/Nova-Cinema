// ─── ESTRELLAS INTERACTIVAS ───────────────────────────────────────────────────
// highlightStars: pinta de dorado las primeras N estrellas y en gris el resto.
// mouseover muestra vista previa, mouseout restaura la selección guardada,
// click confirma la calificación en selectedRating y actualiza el texto descriptivo.

const stars      = document.querySelectorAll(".star");                 // los 5 spans de estrellas
const ratingText = document.getElementById("ratingText");              // texto "X de 5 estrellas"
let selectedRating = 0;                                                // calificación confirmada por el usuario

function highlightStars(count) {
  stars.forEach(star => {
    const val = parseInt(star.dataset.value);                          // lee data-value="1" al "5" del HTML
    star.style.color = val <= count ? "#f5a623" : "#ccc";             // dorado si entra en el rango, gris si no
  });
}

stars.forEach(star => {
  star.addEventListener("mouseover", () => {
    highlightStars(parseInt(star.dataset.value));                      // vista previa hasta la estrella señalada
  });

  star.addEventListener("mouseout", () => {
    highlightStars(selectedRating);                                    // restaura la selección guardada al salir
  });

  star.addEventListener("click", () => {
    selectedRating = parseInt(star.dataset.value);                     // guarda la calificación definitiva
    ratingText.textContent = `${selectedRating} de 5 estrellas`;      // actualiza el texto visible
  });
});


// ─── MENÚ HAMBURGUESA ────────────────────────────────────────────────────────
// toggleMenu: reutiliza la misma lógica del navbar del index.html.
// El guard if(menuToggle) previene errores si el elemento no existe en la página.
// Igual que en index, cierra el menú al hacer clic en cualquier enlace.

const menuToggle = document.getElementById("menu-toggle");             // ícono de tres líneas
const navLinks   = document.getElementById("nav-links");               // lista de links del nav

if (menuToggle) {                                                      // guard: evita error si no está en el DOM
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");                               // abre si está cerrado, cierra si está abierto
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");                             // cierra el menú al navegar
    });
  });
}


// ─── FORMULARIO DE RESEÑAS ────────────────────────────────────────────────────
// submitReview: valida los 4 campos incluida la calificación de estrellas (>0).
// Si pasa, construye un div.comment-item con innerHTML y lo inserta en el DOM.
// Los comentarios no persisten al recargar porque no hay backend ni localStorage.

const reviewForm    = document.getElementById("reviewForm");           // formulario de reseñas
const commentsList  = document.getElementById("commentsList");         // contenedor donde se insertan los comentarios
const messageEl     = document.getElementById("message");              // párrafo de feedback al usuario

reviewForm.addEventListener("submit", (evento) => {
  evento.preventDefault();                                             // evita que la página se recargue

  const nombre     = document.getElementById("userNameReview").value.trim(); // trim elimina espacios al inicio y final
  const pelicula   = document.getElementById("movieSelect").value;
  const comentario = document.getElementById("commentText").value.trim();

  if (!nombre || !pelicula || selectedRating === 0 || !comentario) {  // selectedRating===0 significa sin estrellas
    messageEl.textContent = "Por favor completa todos los campos.";
    messageEl.style.color = "#ff6b6b";                                 // rojo para indicar error
    return;                                                            // detiene la ejecución si hay error
  }

  const commentItem = document.createElement("div");                  // crea el elemento en memoria
  commentItem.classList.add("comment-item");
  commentItem.innerHTML = `
    <strong>${nombre}</strong> — <em>${pelicula}</em>
    <div class="stars-display">${"★".repeat(selectedRating)}${"☆".repeat(5 - selectedRating)}</div>
    <p>${comentario}</p>
  `;                                                                   // ★ repite estrellas llenas, ☆ las vacías

  const emptyMsg = commentsList.querySelector(".empty-comment");
  if (emptyMsg) emptyMsg.remove();                                     // elimina el placeholder "sin comentarios"

  commentsList.appendChild(commentItem);                               // inserta el nuevo comentario en el DOM

  reviewForm.reset();                                                  // limpia todos los campos
  selectedRating = 0;
  highlightStars(0);                                                   // apaga todas las estrellas
  ratingText.textContent = "Selecciona una calificación";

  messageEl.textContent = "¡Crítica publicada con éxito!";
  messageEl.style.color = "#90ee90";                                   // verde para indicar éxito

  setTimeout(() => {
    messageEl.textContent = "";                                        // borra el mensaje después de 3 segundos
  }, 3000);
});
