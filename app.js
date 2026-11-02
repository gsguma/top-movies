const movieList = document.querySelector("#movie-list");
const searchInput = document.querySelector("#search");
const genreFilter = document.querySelector("#genre-filter");
const platformFilter = document.querySelector("#platform-filter");

const genreTranslations = {
  Action: "Ação",
  Adventure: "Aventura",
  Animation: "Animação",
  Biography: "Biografia",
  Comedy: "Comédia",
  Crime: "Crime",
  Documentary: "Documentário",
  Drama: "Drama",
  Family: "Família",
  Fantasy: "Fantasia",
  History: "História",
  Horror: "Terror",
  Music: "Musical",
  Mystery: "Mistério",
  Romance: "Romance",
  "Sci-Fi": "Ficção científica",
  Sport: "Esporte",
  Thriller: "Suspense",
  War: "Guerra",
  Western: "Faroeste"
};

const platformIcons = {
  Netflix: "N",
  "Prime Video": "prime",
  "Apple TV": "tv",
  "Disney+": "D+",
  Globoplay: "globo",
  "Paramount+": "P+",
  Max: "M"
};
const emptyState = document.querySelector("#empty-state");

const sortedMovies = [...movies].sort((a, b) =>
  a.year - b.year || b.rating - a.rating || a.title.localeCompare(b.title, "pt-BR")
);

document.querySelector("#movie-count").textContent =
  `${sortedMovies.length} filme${sortedMovies.length === 1 ? "" : "s"}`;

const genres = [...new Set(sortedMovies.flatMap(movie =>
  movie.genres.map(genre => genreTranslations[genre] || genre)
))]
  .sort((a, b) => a.localeCompare(b, "pt-BR"));

genres.forEach(genre => {
  const option = document.createElement("option");
  option.value = genre;
  option.textContent = genre;
  genreFilter.append(option);
});

const platforms = [...new Set(sortedMovies.flatMap(movie =>
  movie.platforms.map(platform => platform.name)
))].sort((a, b) => a.localeCompare(b, "pt-BR"));

platforms.forEach(platform => {
  const option = document.createElement("option");
  option.value = platform;
  option.textContent = platform;
  platformFilter.append(option);
});

function renderMovies() {
  const query = searchInput.value.trim().toLocaleLowerCase("pt-BR");
  const genre = genreFilter.value;
  const platform = platformFilter.value;
  const visibleMovies = sortedMovies.filter(movie => {
      const matchesGenre = !genre || movie.genres.some(item =>
        (genreTranslations[item] || item) === genre
      );
    const matchesPlatform = !platform ||
      movie.platforms.some(offering => offering.name === platform);
    const searchable = `${movie.title} ${movie.cast.join(" ")}`.toLocaleLowerCase("pt-BR");
    return matchesGenre && matchesPlatform && searchable.includes(query);
  });

  movieList.innerHTML = visibleMovies.map((movie) => {
    const trailerIcon = '<svg class="platform-icon youtube-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z"/></svg>';
    const platformLinks = [...movie.platforms]
      .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"))
      .map(platform => {
        const icon = platformIcons[platform.name] || platform.name.charAt(0);
        return `<a class="platform" href="${platform.url}" target="_blank" rel="noreferrer"><span class="platform-logo platform-${platform.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}">${icon}</span><span>${platform.name}</span></a>`;
      })
      .join("");
    const trailerLink = `<a class="platform trailer-platform" href="${movie.trailer}" target="_blank" rel="noreferrer">${trailerIcon}<span>Trailer - YouTube</span></a>`;

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
          <p class="genres">${movie.genres.map(genre => genreTranslations[genre] || genre).join(" · ")}</p>
          <p class="synopsis">${movie.synopsis}</p>
          <p class="cast"><strong>Elenco: </strong>${movie.cast.join(", ")}</p>
          <div class="platforms"><strong>Onde assistir:</strong>${trailerLink}${platformLinks || '<span>Nenhuma plataforma confirmada</span>'}</div>
        </div>
      </article>`;
  }).join("");

  emptyState.hidden = visibleMovies.length !== 0;
}

searchInput.addEventListener("input", renderMovies);
genreFilter.addEventListener("change", renderMovies);
platformFilter.addEventListener("change", renderMovies);
renderMovies();
