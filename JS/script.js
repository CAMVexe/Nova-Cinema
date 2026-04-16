// ─── MENÚ HAMBURGUESA ────────────────────────────────────────────────────────
// CORRECCIÓN 1: El toggle existía en el HTML y el CSS pero nunca tuvo su listener.
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
      pelicula.style.display = "block";
      coincidenciaEncontrada = true;
    } else {
      pelicula.style.display = "none";
    }
  });

  mensajeSinResultados.style.display = coincidenciaEncontrada ? "none" : "block";
});


// ─── FORMULARIO DE RESERVAS ───────────────────────────────────────────────────
const formularioReservas = document.getElementById("ticketsForm");
const ventanaEmergente = document.getElementById("popup");
const textoPopup = document.getElementById("popupMessage");
const botonCerrarPopup = document.getElementById("closePopup");

function mostrarVentana(mensaje) {
  textoPopup.textContent = mensaje;
  ventanaEmergente.style.display = "flex";
}

function cerrarVentana() {
  ventanaEmergente.style.display = "none";
  // CORRECCIÓN 2: Se eliminó la variable fueExitoso y su bloque if vacío.
  // No ejecutaban ninguna lógica, por lo que solo generaban ruido en el código.
}

formularioReservas.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nombreUsuario = document.getElementById("userName").value.trim();

  // CORRECCIÓN 3: Se reemplazó querySelector("input[type='email']") por getElementById
  // ahora que el input tiene id="email" definido en el HTML.
  const correo = document.getElementById("email").value.trim();

  const peliculaSeleccionada = document.getElementById("movieSelect").value;

  // CORRECCIÓN 3 (mismo motivo): Se reemplazó querySelector("input[type='number']")
  // por getElementById ahora que el input tiene id="cantidadAsientos".
  const cantidadAsientos = document.getElementById("cantidadAsientos").value;

  const fechaFuncion = document.getElementById("fecha-funcion").value;

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
