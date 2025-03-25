// details: https://www.omdbapi.com/?i=tt3896198&apikey=2c675162&

/*Pour que lorsqu'on tape un titre, des suggestions de films (avec ce même titre) apparaissent
dans notre barre de recherche*/
const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
/*Lorsqu'on appuie sur un film de la barre de recherche, l'affiche et le descriptif remplace celui
qui est déjà sur la page principale*/
const resultGrid = document.getElementById('result-grid');

// load movies from API
async function loadMovies(searchTerm){
    /*Pour que l'on puisse avoir accès à n'importe quel film*/
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=2c675162&`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    // console.log(data.Search);
    if(data.Response == "True") displayMovieList(data.Search);
}

/*Pour afficher tous les titres contenant le mot qui est taper dans la barre de recherche*/
function findMovies(){
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } /*sinon continuer la recherche et aucun film ne s'affiche*/else {
        searchList.classList.add('hide-search-list');
    }
}

/*Dans la barre de recherche*/
function displayMovieList(movies){
    searchList.innerHTML = "";
    for(let idx = 0; idx < movies.length; idx++){
        let movieListItem = document.createElement('div');
        //Pour paramétrer chaque ID de chaque film soit chercher dans la base :
        movieListItem.dataset.id = movies[idx].imdbID;
        /*Pour pouvoir cliquer sur un film de la base de donnée*/
        movieListItem.classList.add('search-list-item');
        /*si un film dans la base à une affiche, on la montre sinon icone qui montre
        * qu'il n'y a pas d'affiche */
        if(movies[idx].Poster != "N/A")
            moviePoster = movies[idx].Poster;
        else
            moviePoster = "image_not_found.png";
        /*On affiche le titre et l'année du film si il y a une correspondance entre
        * le titre d'un film et ce qui est tapé dans la barre de recherche*/
        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}

function loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            /*Lorsqu'on appuie sur un film, on obtient l'ID : */
            // console.log(movie.dataset.id);
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=2c675162&`);
            const movieDetails = await result.json();
            // console.log(movieDetails);
            displayMovieDetails(movieDetails);
        });
    });
}

/*Affichage du film sélectionné*/
function displayMovieDetails(details){
    resultGrid.innerHTML = `
    <div class = "movie-poster">
        <!--On affiche l'affiche ou le loge de l'image d'erreur-->
        <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
    </div>
    <!--On remplace toutes les informations du film afficher par les informations
    du film sélectionné-->
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
    </div>
    `;
}


window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.classList.add('hide-search-list');
    }
});
