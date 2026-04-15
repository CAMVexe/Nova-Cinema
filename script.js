//bsqueda en el catálogo de películas
const searchInput = document.getElementById("searchInput");
const movies = document.querySelectorAll(".movie-card");
const noResults = document.getElementById("noResults");

// Función de busqueda
searchInput.addEventListener("input", () => {
  const searchText = searchInput.value.toLowerCase();
  let found = false;
// Recorrer las películas y mostrar solo las que coincidan con el texto de busqueda
  movies.forEach(movie => {
    const title = movie.dataset.title.toLowerCase();
    const genre = movie.dataset.genre.toLowerCase();
// Verificar si el título coinciden con el texto de búsqueda
    if (title.includes(searchText) || genre.includes(searchText)) {
      movie.style.display = "block";
      found = true;
    } else {
      movie.style.display = "none";
    }
  });

  // Mostrar mensaje si no hay resultados
  if (!found) {
    noResults.style.display = "block";
  } else {
    noResults.style.display = "none";
  }
});
const form = document.getElementById("ticketsForm");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popupMessage");
const closePopup = document.getElementById("closePopup");

let exito = false; // para saber si fue éxito o error

function mostrarPopup(mensaje, esExito = false) {
  popupMessage.textContent = mensaje;
  popup.style.display = "flex";
  exito = esExito;
}

function cerrarPopup() {
  popup.style.display = "none";

  // Si fue éxito, no hacer nada más
  if (exito) {
    exito = false;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("userName").value.trim();
  const email = document.querySelector("input[type='email']").value.trim();
  const movie = document.getElementById("movieSelect").value;
  const seats = document.querySelector("input[type='number']").value;
  const date = document.getElementById("fecha-funcion").value;

  if (name === "" || email === "" || movie === "" || seats === "" || date === "") {
    mostrarPopup("Por favor completa todos los campos");
    return;
  }

  mostrarPopup("Reserva realizada con éxito", true);
  form.reset();
});

closePopup.addEventListener("click", cerrarPopup);
