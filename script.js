// Bsqueda en el catálogo de películas
const entradaBusqueda = document.getElementById("searchInput");
const listaPeliculas = document.querySelectorAll(".movie-card");
const mensajeSinResultados = document.getElementById("noResults");

// Función de bscar
entradaBusqueda.addEventListener("input", () => {
  const textoBusqueda = entradaBusqueda.value.toLowerCase();
  let coincidenciaEncontrada = false;

  // Recorrer las pelís y muestra solo las que coincidan
  listaPeliculas.forEach(pelicula => {
    const titulo = pelicula.dataset.title.toLowerCase();
    const genero = pelicula.dataset.genre.toLowerCase();

    // Verificar coincidencias
    if (titulo.includes(textoBusqueda) || genero.includes(textoBusqueda)) {
      pelicula.style.display = "block";
      coincidenciaEncontrada = true;
    } else {
      pelicula.style.display = "none";
    }
  });

  // Mostrar mensaje si no hay resultados
  mensajeSinResultados.style.display = coincidenciaEncontrada ? "none" : "block";
});

const formularioReservas = document.getElementById("ticketsForm");
const ventanaEmergente = document.getElementById("popup");
const textoPopup = document.getElementById("popupMessage");
const botonCerrarPopup = document.getElementById("closePopup");

let fueExitoso = false; // dice si fue éxito o error

function mostrarVentana(mensaje, esExito = false) {
  textoPopup.textContent = mensaje;
  ventanaEmergente.style.display = "flex";
  fueExitoso = esExito;
}

function cerrarVentana() {
  ventanaEmergente.style.display = "none";

  if (fueExitoso) {
    fueExitoso = false;
  }
}

formularioReservas.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nombreUsuario = document.getElementById("userName").value.trim();
  const correo = document.querySelector("input[type='email']").value.trim();
  const peliculaSeleccionada = document.getElementById("movieSelect").value;
  const cantidadAsientos = document.querySelector("input[type='number']").value;
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

  mostrarVentana("Reserva realizada con éxito", true);
  formularioReservas.reset();
});

botonCerrarPopup.addEventListener("click", cerrarVentana);
