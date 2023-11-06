const searchBar = document.getElementById('search-bar');
const submitBtn = document.getElementById('submit-btn');
const resultsDisplayValue = document.querySelector('.search-bar-value');
const modal = document.querySelector("#modal-register");
const closeModal = document.querySelector(".close-button");
const registerBtn = document.querySelector(".open-button-register");


let tabNameMovies = []


submitBtn.addEventListener ('click', (e) => {
    e.preventDefault;
    resultsDisplayValue.innerText = searchBar.value;
});

registerBtn.addEventListener("click", (e) => {
    modal.showModal();
    console.log('works register');
  });

closeModal.addEventListener("click", () => {
    modal.close();
  });



// OBJET LIBRAIRY SWIPER 
function swiperMode(className, next, prev, params) {
  new Swiper(className, {
      effetct: "fade",
      spaceBetween: 20,
      slidesPerView: params,
      pagination: {
          clickable: true,
      },
      navigation: {
          nextEl: next,
          prevEl: prev
      }
  });
}
swiperMode('.swiper_search', '.search_next', '.search_prev', 4 )
swiperMode('.swiper_release', '.release-next', '.release-prev', 4 )
swiperMode('.swiper_genre', '.genre-next', '.genre-prev', 4 )





// SIBLES
let swiperWrapperSearch = document.querySelector('.results-search .swiper-wrapper')
let swiperWrapperRelease = document.querySelector('.latest-release .swiper-wrapper')
let swiperWrapperGenre = document.querySelector('.genre .swiper-wrapper')
let templateMovie = document.querySelector('.templateMovie')
let modalMovie = document.getElementById('modal-movie')


const tabGenresID= {
  Action         : 28,
  Animation      : 16,
  Comedy         : 35,
  Drama          : 18,
  Fantasy        : 14,
  Romance        : 10749,
  Adventure      : 12,
  Crime          : 80,
  Documentary    : 99,
  Family         : 10751,
  History        : 36,
  Horror         : 27,
  Music          : 10402,
  Mystery        : 9648,
  ScienceFiction : 878,
  TVMovie        : 10770,
  Thriller       : 53,
  War            : 10752,
  Western        : 37,
};

// AUTHORIZATION
const option = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTJmOWI5NjgxODNkZjI1MTkzZmU1MmU0YzRmODViZiIsInN1YiI6IjYzYWNiNzllYzgxMTNkMDBhMDI4MjFiMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qgY78uATNXnVYR0plkDVoVxwIYIt-_vSwyvjQOUArzU'
    }
  };
let formSearch = document.querySelector('.search-bar-box')




// HTML INJECTION
async function swiperSlideHtml(movie, swiperWrapper) {
  let swiperSlide = document.createElement('div')
        let swiperCard = document.createElement('div')
        let img = document.createElement('img')
        let h2 = document.createElement('h2')
        let h3 = document.createElement('h3')
        let p_category = document.createElement('p')
        let p_star = document.createElement('p')
        let p_review = document.createElement('p')

        swiperSlide.classList = 'slide-1 swiper-slide'
        swiperCard.classList = 'slide-card-1'
        swiperCard.setAttribute('accessKey', movie.id)
        h2.classList = 'movie-title'
        h3.classList = 'movie-release-date'
        p_category.classList = 'movie-category'
        p_star.classList = 'star'
        p_star.innerHTML = `<img src="./assets/images/star.png" alt="star">`
        p_review.classList = 'review'
        img.classList = 'picture'
        
        let tabTampon;
        
        movie.genre_ids.forEach(genreId => {
          for (let i = 0; i < Object.keys(tabGenresID).length; i++) {
            if (genreId == tabGenresID[Object.keys(tabGenresID)[i]]) {
              p_category.append(`${Object.keys(tabGenresID)[i]} / `) 
            } else {
              console.log(false);
            }
          }
        })

        tabTampon = p_category.innerText.split(' ')
        p_category.innerHTML = ""
        tabTampon.pop()
        tabTampon.pop()
        tabTampon.forEach(ele => p_category.append(`${ele} `))
        
        setTimeout(() => {
          img.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`)
          h2.innerText = movie.title
          h3.innerText = movie.release_date.slice(0,4)
          p_review.innerText = Number.parseFloat(movie.vote_average).toFixed(1);
          swiperCard.append(h2, h3, p_category, p_star, p_review)
          swiperSlide.append(img,swiperCard)
          swiperWrapper.append(swiperSlide)
        }, 500);
}



function dataFetch(url, swiper, option){
  fetch(url, option)
  .then(response => response.json())
  .then(response => {
    swiper.innerHTML = ""
    response.results.forEach(movie => {
      let verif = tabNameMovies.filter(title => title.nameMovies == movie.title)
      
      verif == 0 ? tabNameMovies.push({nameMovies: movie.title}) : false

      let data = async ()=>{
        await swiperSlideHtml(movie, swiper)
      }
      data()
    })
    // cashBnts()
  })
  .catch(err => console.error(err));
}


// LIST BY SEARCH
formSearch.addEventListener('submit', (e) => {
  e.preventDefault()
  e.stopImmediatePropagation()
  dataFetch(`https://api.themoviedb.org/3/search/movie?query=${formSearch.searchBar.value}&include_adult=false&language=en-US&page=1`,swiperWrapperSearch ,option)
})


// LIST BY LASTED RELEASE
dataFetch(`https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&release_date.gte=2023-10-26&sort_by=popularity.desc`,swiperWrapperRelease ,option)



// LIST BY GENRES 
let genre = 35
dataFetch(`https://api.themoviedb.org/3/discover/movie?&with_genres=${genre}`,swiperWrapperGenre ,option)


// CHOISE GENRE
let genreCategory = document.querySelector('.genre-category')
genreCategory.querySelectorAll('li').forEach(li => {
  
  li.addEventListener('click', (e)=>{

    genreCategory.querySelectorAll('li').forEach(allLi => {
      allLi.classList = '';
    })
    document.querySelector('.category-p').innerText = e.target.innerText;

    let tampon = e.target.innerText;

    e.target.classList = 'active';

    try {
      genre = tabGenresID[tampon]
    } catch (error) {
      console.log(error);
    }
    
    dataFetch(`https://api.themoviedb.org/3/discover/movie?&with_genres=${genre}`,swiperWrapperGenre ,option)
})})


// Modal INFOS MOVIES
function clearModalMovie() {
  modalMovie.querySelector('.title').innerText = ""
  modalMovie.querySelector('img').getAttribute('src') = ""
  modalMovie.querySelector('.date').innerText = ""
  modalMovie.querySelector('.note').innerText = ""
  modalMovie.querySelector('.txt').innerText = ""
  modalMovie.querySelector('.genre').innerText = ""
  modalMovie.querySelector('.actors').innerText = ""
}
document.addEventListener('click', (e)=>{
      
      if (e.target.accessKey) {
        fetch(`https://api.themoviedb.org/3/movie/${e.target.accessKey}?language=en-US`, option)
          .then(response => response.json())
          .then(response => {
            modalMovie.querySelector('.title').innerText = response.original_title
            modalMovie.querySelector('img').setAttribute('src', `https://image.tmdb.org/t/p/w300${response.poster_path}`)

            modalMovie.querySelector('.date').innerText = response.release_date.slice(0,4)
            modalMovie.querySelector('.note').innerText = response.vote_average.toFixed(1)
            

            modalMovie.querySelector('.txt').innerText = response.overview
            let tabTampon;
            response.genres.forEach(genre => {
              modalMovie.querySelector('.genre').append(`${genre.name} / `)
            })

            tabTampon = modalMovie.querySelector('.genre').innerText.split(' ')
            modalMovie.querySelector('.genre').innerHTML = ""
            tabTampon.pop()
            tabTampon.pop()
            tabTampon.forEach(ele => modalMovie.querySelector('.genre').append(`${ele} `))
            
            
            fetch(`https://api.themoviedb.org/3/trending/person/day?language=en-US`, option)
              .then(actor => actor.json())
              .then( data => {
                
                data.results.forEach(actor => {
                  
                  actor.known_for.filter(a => {
                    
                    if (a.original_title == response.original_title) {
                      modalMovie.querySelector('.actors').append(`${actor.original_name} `) 
                    } else {}
                  })
                })
              })
              .catch(er => console.log(er))

          })
          .catch(err => console.log(err));

          setTimeout(() => {
            modalMovie.showModal()
          }, 500);

      } else {}
})


// CLOSE MODAL
document.querySelector('.btn_modal_movie_off')
.addEventListener('click', ()=>{
  modalMovie.close()
  clearModalMovie()
})