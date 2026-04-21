// menu de hamburguesa
// Esta partecontrola el menú desplegable en dispositivos pequeños (responsive).
// La idea es que al hacer clic en el icono de hamburguesa (las 3 líneas),
// el menú aparezca o desaparezca usando una clase de CSS

// se obtiene el botón del menú (el icono de hamburguesa)
const menuToggle = document.getElementById("menu-toggle");

// se obtiene elcontenedor donde estn los enlaces de navegación
const navLinks = document.getElementById("nav-links");

// se crea un evento que se activa cuando el usuario hace clic en el btn
menuToggle.addEventListener("click", () => {

  // se usa toggle para agregar la clase "active" si no la tiene, o quitarla si ya la tiene
  // Esto permite mostrar/ocultar el menú
  navLinks.classList.toggle("active");
});

// Seleccionamos todos los enlaces dentro del menu
navLinks.querySelectorAll("a").forEach(link => {

  // A cada enlace se le agrega un evento click que se activa cuando el usuario hace clic en el
  link.addEventListener("click", () => {

    // Cuando el usuario selecciona una opción del menú,
    // se cierra automticamente quitando la clase "active"
    navLinks.classList.remove("active");
  });
});


//busqueda en el catalogo
// Esta parte permite filtrar las pelis en tiempo real o sea mientras el usuario escribe
// Se compara el texto ingresado con el título y el género de cada película,
// que están guardados como data-* en el HTML

// Input donde el usuario escribe lo que quiere buscar
const entradaBusqueda = document.getElementById("searchInput");

// Lista de todas las pelis (cada una es un elemento con clase "movie-card")
const listaPeliculas = document.querySelectorAll(".movie-card");

// Esto muestra el mensaje "No se encontraron resultados" cuando no hay coincidencias
const mensajeSinResultados = document.getElementById("noResults");

// Evento que se activa cada vez que el usuario escribe algo o sea cada vez que cambia el contenido del input de busqueda
entradaBusqueda.addEventListener("input", () => {

  // aqui se convierte el texto a minscula para evitar problemas al comparar
  const textoBusqueda = entradaBusqueda.value.toLowerCase();

  // esto indica si se encontró al menos una coincidencia
  let coincidenciaEncontrada = false;

  // Recorremos cada película
  listaPeliculas.forEach(pelicula => {

    // aqui obtenemos el título y género desde los atributos data-* del HTML
    const titulo = pelicula.dataset.title.toLowerCase();
    const genero = pelicula.dataset.genre.toLowerCase();

    // Verificamos si el texto ingresado coincide con el título o el género
    if (titulo.includes(textoBusqueda) || genero.includes(textoBusqueda)) {

      // Si coincide, quitamos la clase "hidden" para que se vea
      pelicula.classList.remove("hidden");

      // Marcamos que si hubo coincidencia
      coincidenciaEncontrada = true;

    } else {
      // Y si no coincide, agregamos la clase "hidden" para ocultarla
      // (esto nos deja usar animaciones en CSS en lugar de display:none)
      pelicula.classList.add("hidden");
    }
  });

  // Si NO se encontro ninguna coincidencia, se muestra el mensaje
  // Si sí hay coincidencias, el mensaje se oculta
  mensajeSinResultados.classList.toggle("show", !coincidenciaEncontrada);
});


// FORM DE RESERVAS
// Esta parte controla el formulario de compra de tickets.
// Valida que todos los campos estén llenos antes de enviar,
// y muestra un popup con un mensaje dependiendo del resultado.

//aqui obtenemos el formulario
const formularioReservas = document.getElementById("ticketsForm");

// aqui obtenemos el contenedor del popup 
const ventanaEmergente = document.getElementById("popup");

// aqui sale el texto donde se mostrará el mensaje dentro del popup
const textoPopup = document.getElementById("popupMessage");

// Botón para cerrar el popup
const botonCerrarPopup = document.getElementById("closePopup");


// Función para mostrar el popup con un mensaje
function mostrarVentana(mensaje) {

  // Insertamos el texto recibido en el popup
  textoPopup.textContent = mensaje;

  // Mostramos el popup (se usa flex porque el CSS  usa flexbox)
  ventanaEmergente.style.display = "flex";
}


// Función para cerrar el popup
function cerrarVentana() {

  // Ocultamos el popup
  ventanaEmergente.style.display = "none";
}


// Esto se ejecuta cuando el usuario envía el formulario
formularioReservas.addEventListener("submit", (evento) => {

  // Evita que la página se recargue automáticamente cuando se envía el formulario
  evento.preventDefault();

  // Obtenemos los valores ingresados por el usuario
  // usamos el trim() para eliminar espacios vacíos al inicio y final
  const nombreUsuario = document.getElementById("userName").value.trim();
  const correo = document.getElementById("email").value.trim();
  const peliculaSeleccionada = document.getElementById("movieSelect").value;
  const cantidadAsientos = document.getElementById("cantidadAsientos").value;
  const fechaFuncion = document.getElementById("fecha-funcion").value;

  // Validacion, verificamos que ningún campo este vacío
  if (
    nombreUsuario === "" ||
    correo === "" ||
    peliculaSeleccionada === "" ||
    cantidadAsientos === "" ||
    fechaFuncion === ""
  ) {

    // Si falta algun dato, mostramos mensaje de error
    mostrarVentana("Por favor completa todos los campos");
    return; // Detiene la ejecución
  }

  // Si todo bien, mostramos mensaje de éxito
  mostrarVentana("¡Reserva realizada con éxito!");

  // Limpiamos todos los campos del formulario
  formularioReservas.reset();
});


// Evento para cerrar el popup cuando se hace clic en el btn cerrar
botonCerrarPopup.addEventListener("click", cerrarVentana);
