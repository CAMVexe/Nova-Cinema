// ─── MENÚ HAMBURGUESA ────────────────────────────────────────────────────────
// toggleMenu: controla la apertura y cierre del menú en móvil y tablet.
// Alterna la clase "active" en nav-links, que el CSS usa para mostrarlo u ocultarlo.
// El forEach cierra el menú automáticamente al seleccionar cualquier enlace.

const menuToggle = document.getElementById("menu-toggle");             // ícono de tres líneas
const navLinks   = document.getElementById("nav-links");               // lista de links del nav

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");                                  // abre si está cerrado, cierra si está abierto
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");                                // cierra el menú al navegar
  });
});


// ─── BÚSQUEDA EN EL CATÁLOGO ─────────────────────────────────────────────────
// filterMovies: filtra las tarjetas en tiempo real comparando el texto escrito
// contra data-title y data-genre de cada card usando toLowerCase para ignorar mayúsculas.
// Usa clase .hidden para que el CSS maneje la transición suave en vez de cortar con display:none.

const entradaBusqueda      = document.getElementById("searchInput");   // campo de texto del buscador
const listaPeliculas       = document.querySelectorAll(".movie-card"); // todas las tarjetas del grid
const mensajeSinResultados = document.getElementById("noResults");     // aviso de "sin resultados"

entradaBusqueda.addEventListener("input", () => {                      // "input" captura pegado y autocompletado
  const textoBusqueda = entradaBusqueda.value.toLowerCase();           // normaliza a minúsculas para comparar
  let coincidenciaEncontrada = false;

  listaPeliculas.forEach(pelicula => {
    const titulo = pelicula.dataset.title.toLowerCase();               // lee atributo data-title del HTML
    const genero = pelicula.dataset.genre.toLowerCase();               // lee atributo data-genre del HTML

    if (titulo.includes(textoBusqueda) || genero.includes(textoBusqueda)) {
      pelicula.classList.remove("hidden");                             // card visible — coincide con la búsqueda
      coincidenciaEncontrada = true;
    } else {
      pelicula.classList.add("hidden");                                // card oculta con fade via CSS
    }
  });

  mensajeSinResultados.classList.toggle("show", !coincidenciaEncontrada); // muestra aviso si no hay resultados
});


// ─── POPUP DE ALERTAS ────────────────────────────────────────────────────────
// showPopup / closePopup: controlan la ventana modal de confirmación y error.
// mostrarVentana inyecta el mensaje recibido y cambia display a flex para centrar el contenido.
// cerrarVentana lo oculta volviendo display a none.

const formularioReservas = document.getElementById("ticketsForm");     // formulario principal de reservas
const ventanaEmergente   = document.getElementById("popup");           // contenedor del modal
const textoPopup         = document.getElementById("popupMessage");    // párrafo donde se muestra el mensaje
const botonCerrarPopup   = document.getElementById("closePopup");      // botón de cerrar del modal

function mostrarVentana(mensaje) {
  textoPopup.textContent = mensaje;                                    // escribe el mensaje en el modal
  ventanaEmergente.style.display = "flex";                             // flex para centrar el contenido
}

function cerrarVentana() {
  ventanaEmergente.style.display = "none";                             // oculta el modal
}

botonCerrarPopup.addEventListener("click", cerrarVentana);             // cierra al hacer clic en "Cerrar"


// ─── FORMULARIO DE RESERVAS ───────────────────────────────────────────────────
// submitTickets: valida los 5 campos antes de confirmar la reserva.
// preventDefault cancela el reload del navegador para manejar todo desde JS.
// parseInt en asientos evita que valores como 0 o negativos pasen la validación.

formularioReservas.addEventListener("submit", (evento) => {
  evento.preventDefault();                                             // evita que la página se recargue

  const nombreUsuario      = document.getElementById("userName").value.trim();         // elimina espacios al inicio y final
  const correo             = document.getElementById("email").value.trim();
  const peliculaSeleccionada = document.getElementById("movieSelect").value;
  const cantidadAsientos   = document.getElementById("cantidadAsientos").value;
  const fechaFuncion       = document.getElementById("fecha-funcion").value;

  if (
    nombreUsuario === ""       ||
    correo === ""              ||
    peliculaSeleccionada === ""||
    cantidadAsientos === ""    ||
    parseInt(cantidadAsientos) < 1 ||                                  // rechaza 0 y negativos
    fechaFuncion === ""
  ) {
    mostrarVentana("Por favor completa todos los campos correctamente");
    return;                                                            // detiene la ejecución si hay error
  }

  mostrarVentana("¡Reserva realizada con éxito!");
  formularioReservas.reset();                                          // limpia todos los campos del formulario
});
