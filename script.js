let elForm = MakeElem('#form')
let movieList = MakeElem('.movie__list')
let movieGenreList = MakeElem('.movie__genre-list')
let movieGenre = MakeElem('.movie__genre')
let movieSearch = MakeElem('.movie__search')
let elMovieFilter = MakeElem(".movie__filter")
let open = document.getElementById('open')
let model_container = document.getElementById('model_container')
let close = document.getElementById('close')


elForm.addEventListener('submit',(e)  =>{
    e.preventDefault()
    
    let selectGenres = movieGenre.value.trim()
    let searchFilms = movieSearch.value.trim()
    let regex = RegExp(searchFilms, 'gi')

    let searchedFilms = films.filter((film) =>{
        return film.title.match(regex)
    })

    let foundFilms = []
    
    if (selectGenres == 'All'){
        foundFilms = searchedFilms
    }else {
        foundFilms = searchedFilms.filter(film =>{
            return film.genres.includes(selectGenres)
        })
    }
    render(foundFilms,movieList )
})

open.addEventListener('click', () =>{
    model_container.classList.add('show');
});


close.addEventListener('click', () =>{
    model_container.classList.remove('show');
});





function renderGenresSelect(films, element) {
    const result = []
    films.forEach(film => {
        film.genres.forEach(genre =>{
            if (!result.includes(genre)) {
                result.push(genre)
            }
        })
    })
    result.forEach(genre =>{
        const newOption = CreateDom('option')
        newOption.value = genre;
        newOption.textContent = genre       
        element.appendChild(newOption)
    })
}
renderGenresSelect(films, movieGenre)
function render(arrFilm, element) {

    element.innerHTML = null
    arrFilm.forEach(film => {
        
        let newLi = CreateDom('li')
        let newImg = CreateDom('img')
        let newHeading = CreateDom('h2')
        let newTime = CreateDom('time')
        let newGenreLi = CreateDom('p')

        newLi.setAttribute('class','movie__item' )
        newImg.setAttribute('src', film.poster)
        newImg.setAttribute('width','150' )
        newImg.setAttribute('height','200')
        newHeading.setAttribute('class', 'movie__item-title')
        newTime.setAttribute('datetime', normalizeDate(film.release_date))
        newGenreLi.setAttribute('class', 'movie__genre')
        
        newHeading.textContent = film.title
        newTime.textContent = normalizeDate(film.release_date)
        newGenreLi.textContent = film.genres
        
        newLi.appendChild(newImg)
        newLi.appendChild(newHeading)
        newLi.appendChild(newTime)
        newLi.appendChild(newGenreLi)
        movieList.appendChild(newLi)
    });
}
render(films, movieList)
