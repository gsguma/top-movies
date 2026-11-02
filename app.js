const movieList = document.querySelector("#movie-list");
const searchInput = document.querySelector("#search");
const genreFilter = document.querySelector("#genre-filter");
const emptyState = document.querySelector("#empty-state");

const sortedMovies = [...movies].sort((a, b) =>
  a.year - b.year || b.rating - a.rating || a.title.localeCompare(b.title, "pt-BR")
);

document.querySelector("#movie-count").textContent =
  `${sortedMovies.length} filme${sortedMovies.length === 1 ? "" : "s"}`;

const genres = [...new Set(sortedMovies.flatMap(movie => movie.genres))]
  .sort((a, b) => a.localeCompare(b, "pt-BR"));

genres.forEach(genre => {
  const option = document.createElement("option");
  option.value = genre;
  option.textContent = genre;
  genreFilter.append(option);
});

function renderMovies() {
  const query = searchInput.value.trim().toLocaleLowerCase("pt-BR");
  const genre = genreFilter.value;
  const visibleMovies = sortedMovies.filter(movie => {
    const matchesGenre = !genre || movie.genres.includes(genre);
    const searchable = `${movie.title} ${movie.cast.join(" ")}`.toLocaleLowerCase("pt-BR");
    return matchesGenre && searchable.includes(query);
  });

  movieList.innerHTML = visibleMovies.map((movie) => {
    const platforms = movie.platforms.map(platform =>
      `<a class="platform" href="${platform.url}" target="_blank" rel="noreferrer">${platform.name}</a>`
    ).join("");

    return `
      <article class="movie-card">
        <div class="poster-wrap">
          <span class="rank">${sortedMovies.indexOf(movie) + 1}</span>
          <a href="${movie.imdb}" target="_blank" rel="noreferrer" aria-label="Ver ${movie.title} no IMDb">
            <img class="poster" src="${movie.image}" alt="Pôster de ${movie.title}" loading="lazy"
              onerror="this.onerror=null;this.src='data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;600&quot; height=&quot;900&quot; viewBox=&quot;0 0 600 900&quot;><rect width=&quot;600&quot; height=&quot;900&quot; fill=&quot;%23172019&quot;/><rect x=&quot;28&quot; y=&quot;28&quot; width=&quot;544&quot; height=&quot;844&quot; fill=&quot;none&quot; stroke=&quot;%23f5c84c&quot; stroke-width=&quot;3&quot;/><text x=&quot;300&quot; y=&quot;430&quot; fill=&quot;white&quot; font-family=&quot;Georgia&quot; font-size=&quot;54&quot; text-anchor=&quot;middle&quot;'>TOP</text><text x=&quot;300&quot; y=&quot;500&quot; fill=&quot;%23f5c84c&quot; font-family=&quot;Georgia&quot; font-size=&quot;54&quot; text-anchor=&quot;middle&quot;>MOVIES</text></svg>')">
          </a>
        </div>
        <div class="movie-content">
          <div class="movie-heading">
            <h2>${movie.title}</h2>
            <span class="year">${movie.year}</span>
            <a class="rating" href="${movie.imdb}" target="_blank" rel="noreferrer" aria-label="Nota IMDb: ${movie.rating}">
              ★ ${movie.rating} <span>/ 10</span>
            </a>
          </div>
          <p class="genres">${movie.genres.join(" · ")}</p>
          <p class="synopsis">${movie.synopsis}</p>
          <p class="cast"><strong>Elenco: </strong>${movie.cast.join(", ")}</p>
          <div class="actions">
            <a class="button trailer" href="${movie.trailer}" target="_blank" rel="noreferrer">▶ Trailer no YouTube</a>
            <a class="button" href="${movie.imdb}" target="_blank" rel="noreferrer">IMDb</a>
          </div>
          <div class="platforms"><strong>Onde assistir:</strong>${platforms || '<span>Nenhuma plataforma confirmada</span>'}</div>
        </div>
      </article>`;
  }).join("");

  emptyState.hidden = visibleMovies.length !== 0;
}

searchInput.addEventListener("input", renderMovies);
genreFilter.addEventListener("change", renderMovies);
renderMovies();
