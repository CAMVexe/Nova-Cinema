// ─── MENÚ HAMBURGUESA ────────────────────────────────────────────────────────
// Controla el menú desplegable en móvil/tablet.
// Al hacer clic en el ícono de tres líneas, se añade/quita la clase "active"
// que el CSS usa para mostrar u ocultar el nav-links.
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Cierra el menú al hacer clic en cualquier enlace (comportamiento estándar en móvil)
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});


// ─── BÚSQUEDA EN EL CATÁLOGO ─────────────────────────────────────────────────
// Filtra las tarjetas de películas en tiempo real mientras el usuario escribe.
// Compara el texto ingresado contra el data-title y data-genre de cada .movie-card.
// Se usa la clase CSS .hidden en vez de display:none para permitir
// una transición suave de opacidad al filtrar (integración Persona 5).
const entradaBusqueda = document.getElementById("searchInput");
const listaPeliculas = document.querySelectorAll(".movie-card");
const mensajeSinResultados = document.getElementById("noResults");

entradaBusqueda.addEventListener("input", () => {
  const textoBusqueda = entradaBusqueda.value.toLowerCase();
  let coincidenciaEncontrada = false;

  listaPeliculas.forEach(pelicula => {
    const titulo = pelicula.dataset.title.toLowerCase();
    const genero = pelicula.dataset.genre.toLowerCase();

    if (titulo.includes(textoBusqueda) || genero.includes(textoBusqueda)) {
      pelicula.classList.remove("hidden");
      coincidenciaEncontrada = true;
    } else {
      pelicula.classList.add("hidden");
    }
  });

  // Muestra u oculta el mensaje de "sin resultados" según haya coincidencias
  mensajeSinResultados.classList.toggle("show", !coincidenciaEncontrada);
});


// ─── FORMULARIO DE RESERVAS ───────────────────────────────────────────────────
// Maneja la reserva de tickets: valida que todos los campos estén llenos
// antes de confirmar, y muestra un popup en ambos casos (error o éxito).
const formularioReservas = document.getElementById("ticketsForm");
const ventanaEmergente = document.getElementById("popup");
const textoPopup = document.getElementById("popupMessage");
const botonCerrarPopup = document.getElementById("closePopup");

// Muestra el popup con el mensaje recibido como argumento
function mostrarVentana(mensaje) {
  textoPopup.textContent = mensaje;
  ventanaEmergente.style.display = "flex";
}

// Cierra el popup al hacer clic en "Cerrar"
function cerrarVentana() {
  ventanaEmergente.style.display = "none";
}

formularioReservas.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nombreUsuario = document.getElementById("userName").value.trim();
  const correo = document.getElementById("email").value.trim();
  const peliculaSeleccionada = document.getElementById("movieSelect").value;
  const cantidadAsientos = document.getElementById("cantidadAsientos").value;
  const fechaFuncion = document.getElementById("fecha-funcion").value;

  // Validación: ningún campo puede quedar vacío
  if (
    nombreUsuario === "" ||
    correo === "" ||
    peliculaSeleccionada === "" ||
    cantidadAsientos === "" ||
    fechaFuncion === ""
  ) {
    mostrarVentana("Por favor completa todos los campos");
    return;
  }

  mostrarVentana("¡Reserva realizada con éxito!");
  formularioReservas.reset();
});

botonCerrarPopup.addEventListener("click", cerrarVentana);
