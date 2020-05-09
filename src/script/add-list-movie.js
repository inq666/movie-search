class Addlist {
  constructor() {
    this.myMovieList = false;
    this.myLoveMovie = JSON.parse(localStorage.getItem('myLoveMovie')) || [];
    this.myWillWatch = JSON.parse(localStorage.getItem('myWillWatch')) || [];
  }

  createDOM() {
    this.closeModalWindow = document.querySelector('.close-modal-window');
    this.myListMovie = document.querySelector('.modal-window');
    this.swiperWrapper = document.querySelector('.swiper-wrapper');
    this.myMovieButton = document.querySelector('.button-my-movie');
    this.listMovieCopy = document.querySelector('.list-movie-item');
    this.listMovieCopy.remove();
  }

  addEventListener() {
    this.myListMovie.addEventListener('click', (event) => this.deleteMovie(event));
    this.closeModalWindow.addEventListener('click', () => this.closeMyListMovie());
    this.swiperWrapper.addEventListener('click', (event) => this.listMovie(event));
    this.myMovieButton.addEventListener('click', () => this.createMyMovieList());
    window.addEventListener('unload', () => {
      localStorage.setItem('myLoveMovie', JSON.stringify(this.myLoveMovie));
      localStorage.setItem('myWillWatch', JSON.stringify(this.myWillWatch));
    });
    this.myListMovie.addEventListener('click', (event) => {
      if (event.target.closest('.favorite-movie') && this.activeTab) {
        this.createFavoriteMovie();
      } else if (event.target.closest('.watch-later') && !this.activeTab) {
        this.createWillWatchMovie();
      }
    });
  }

  closeMyListMovie() {
    this.myListMovie.style.display = 'none';
  }

  deleteMovie(event) {
    if (!event.target.classList.contains('delete-movie')) return;
    const targetDelete = event.target.closest('.list-movie-item');
    if (this.activeTab) {
      this.myWillWatch.forEach((item, index) => {
        this.swiperWrapper.querySelectorAll('.swiper-slide').forEach((slide) => {
          if (item.id === slide.dataset.id) {
            slide.querySelector('.will-watch').style.opacity = '0.3';
            slide.querySelector('.will-watch-confrim').style.backgroundImage = 'url("image/icon/time.png")';
            slide.querySelector('.will-watch-confrim').style.opacity = '0.3';
            slide.dataset.willLater = 'false';
          }
        });
        if (item.id === targetDelete.dataset.idMovie) {
          this.myWillWatch.splice(index, 1);
        }
      });
      this.createWillWatchMovie();
    } else {
      this.myLoveMovie.forEach((item, index) => {
        this.swiperWrapper.querySelectorAll('.swiper-slide').forEach((slide) => {
          if (item.id === slide.dataset.id) {
            slide.querySelector('.love-movie-button').style.opacity = '0.3';
            slide.dataset.favorite = 'false';
          }
        });
        if (item.id === targetDelete.dataset.idMovie) {
          this.myLoveMovie.splice(index, 1);
        }
      });
      this.createFavoriteMovie();
    }
  }

  listMovie(event) {
    const target = event.target;
    const currentSlide = target.closest('.swiper-slide');

    if (target.classList.contains('love-movie-button') && (currentSlide.dataset.favorite === 'false' || !currentSlide.dataset.favorite)) {
      target.style.opacity = '1';
      currentSlide.dataset.favorite = 'true';

      this.myLoveMovie.unshift({
        poster: getComputedStyle(currentSlide.querySelector('.movie-image')).backgroundImage,
        title: currentSlide.querySelector('.movie-title').textContent,
        href: currentSlide.querySelector('.movie-title').href,
        year: currentSlide.querySelector('.movie-year').textContent,
        plot: currentSlide.querySelector('.description').innerHTML,
        id: currentSlide.dataset.id,
      });
    } else if (currentSlide.dataset.favorite === 'true' && target.classList.contains('love-movie-button')) {
      target.style.opacity = '0.3';
      currentSlide.dataset.favorite = 'false';

      this.myLoveMovie.forEach((item, index) => {
        if (item.id === currentSlide.dataset.id) {
          this.myLoveMovie.splice(index, 1);
        }
      });
    }

    if (target.closest('.will-watch') && (currentSlide.dataset.willLater === 'false' || !currentSlide.dataset.willLater)) {
      target.style.opacity = '0.8';
      currentSlide.querySelector('.will-watch-confrim').style.backgroundImage = 'url("image/icon/v.png")';
      currentSlide.querySelector('.will-watch-confrim').style.opacity = '1';
      currentSlide.dataset.willLater = 'true';

      this.myWillWatch.unshift({
        poster: getComputedStyle(currentSlide.querySelector('.movie-image')).backgroundImage,
        title: currentSlide.querySelector('.movie-title').textContent,
        href: currentSlide.querySelector('.movie-title').href,
        year: currentSlide.querySelector('.movie-year').textContent,
        plot: currentSlide.querySelector('.description').innerHTML,
        id: currentSlide.dataset.id,
      });
    } else if (currentSlide.dataset.willLater === 'true' && target.closest('.will-watch')) {
      target.style.opacity = '0.3';
      currentSlide.querySelector('.will-watch-confrim').style.backgroundImage = 'url("image/icon/time.png")';
      currentSlide.querySelector('.will-watch-confrim').style.opacity = '0.3';
      currentSlide.dataset.willLater = 'false';

      this.myWillWatch.forEach((item, index) => {
        if (item.id === currentSlide.dataset.id) {
          this.myWillWatch.splice(index, 1);
        }
      });
    }
  }

  createMyMovieList() {
    if (!this.myMovieList) {
      this.myListMovie.style.display = 'block';
      this.createWillWatchMovie();
    }
  }

  createWillWatchMovie() {
    document.querySelector('.favorite-movie').classList.remove('active-tab');
    document.querySelector('.watch-later').classList.add('active-tab');
    document.querySelector('.list-movie').innerHTML = '';
    this.activeTab = true;
    for (let i = 0; i < this.myWillWatch.length; i += 1) {
      const newMovie = this.listMovieCopy.cloneNode(true);
      newMovie.dataset.idMovie = this.myWillWatch[i].id;
      newMovie.querySelector('.poster-list-movie').style.backgroundImage = this.myWillWatch[i].poster;
      newMovie.querySelector('.title-list-movie').textContent = `${this.myWillWatch[i].title} ${this.myWillWatch[i].year}`;
      newMovie.querySelector('.title-list-movie').href = this.myWillWatch[i].href;
      newMovie.querySelector('.poster-list-movie').href = this.myWillWatch[i].href;
      newMovie.querySelector('.plot-list-movie').innerHTML = this.myWillWatch[i].plot;
      document.querySelector('.list-movie').prepend(newMovie);
    }
  }

  createFavoriteMovie() {
    document.querySelector('.watch-later').classList.remove('active-tab');
    document.querySelector('.favorite-movie').classList.add('active-tab');
    document.querySelector('.list-movie').innerHTML = '';
    this.activeTab = false;
    for (let i = 0; i < this.myLoveMovie.length; i += 1) {
      const newMovie = this.listMovieCopy.cloneNode(true);
      newMovie.dataset.idMovie = this.myLoveMovie[i].id;
      newMovie.querySelector('.poster-list-movie').style.backgroundImage = this.myLoveMovie[i].poster;
      newMovie.querySelector('.title-list-movie').textContent = `${this.myLoveMovie[i].title} ${this.myLoveMovie[i].year}`;
      newMovie.querySelector('.title-list-movie').href = this.myLoveMovie[i].href;
      newMovie.querySelector('.poster-list-movie').href = this.myLoveMovie[i].href;
      newMovie.querySelector('.plot-list-movie').innerHTML = this.myLoveMovie[i].plot;
      document.querySelector('.list-movie').prepend(newMovie);
    }
  }
}

const addList = new Addlist();
addList.createDOM();
addList.addEventListener();

export default addList;
