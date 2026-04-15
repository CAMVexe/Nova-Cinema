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

// Formulario de reserva de tickets 
// Obtener lo ingresado del formulario
const form = document.getElementById("ticketsForm");
const message = document.getElementById("message");

// Validar el formulario al enviar
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("userName").value.trim();
  const email = document.querySelector("input[type='email']").value.trim();
  const movie = document.getElementById("movieSelect").value;
  const seats = document.querySelector("input[type='number']").value;
  const date = document.getElementById("fecha-funcion").value;
// Validar que todos los campos estén completos
  if (name === "" || email === "" || movie === "" || seats === "" || date === "") {
    message.textContent = "Por favor completa todos los campos";
    message.style.color = "red";
    return;
  }

  message.textContent = "Reserva realizada con éxito";
  message.style.color = "green";

  form.reset();
});
