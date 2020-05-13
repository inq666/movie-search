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
    this.swiperWrapper.addEventListener('click', (event) => this.checkList(event));
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
        if (item.id === targetDelete.dataset.idMovie) {
          this.myWillWatch.splice(index, 1);
        }
      });
      this.swiperWrapper.querySelectorAll('.swiper-slide').forEach((item) => {
        const slide = item;
        if (targetDelete.dataset.idMovie === slide.dataset.id) {
          slide.querySelector('.will-watch').style.opacity = '0.3';
          slide.querySelector('.will-watch-confrim').style.backgroundImage = 'url("image/icon/time.png")';
          slide.querySelector('.will-watch-confrim').style.opacity = '0.3';
          slide.dataset.willLater = 'false';
        }
      });
      this.createWillWatchMovie();
    } else {
      this.myLoveMovie.forEach((item, index) => {
        if (item.id === targetDelete.dataset.idMovie) {
          this.myLoveMovie.splice(index, 1);
        }
      });
      this.swiperWrapper.querySelectorAll('.swiper-slide').forEach((item) => {
        const slide = item;
        if (targetDelete.dataset.idMovie === slide.dataset.id) {
          slide.querySelector('.love-movie-button').style.opacity = '0.3';
          slide.dataset.favorite = 'false';
        }
      });
      this.createFavoriteMovie();
    }
  }

  addDataArray(array) {
    array.unshift({
      poster: getComputedStyle(this.currentSlide.querySelector('.movie-image')).backgroundImage,
      title: this.currentSlide.querySelector('.movie-title').textContent,
      href: this.currentSlide.querySelector('.movie-title').href,
      year: this.currentSlide.querySelector('.movie-year').textContent,
      plot: this.currentSlide.querySelector('.description').innerHTML,
      id: this.currentSlide.dataset.id,
    });
  }

  changeArray(array) {
    array.forEach((item, index) => {
      if (item.id === this.currentSlide.dataset.id) {
        array.splice(index, 1);
      }
    });
  }

  changeFavorite() {
    if (this.currentSlide.dataset.favorite === 'false' || !this.currentSlide.dataset.favorite) {
      this.target.style.opacity = '1';
      this.currentSlide.dataset.favorite = 'true';
      this.addDataArray(this.myLoveMovie, this.currentSlide);
    } else if (this.currentSlide.dataset.favorite === 'true' && this.target.classList.contains('love-movie-button')) {
      this.target.style.opacity = '0.3';
      this.currentSlide.dataset.favorite = 'false';
      this.changeArray(this.myLoveMovie);
    }
  }

  changeWillLater() {
    if (this.currentSlide.dataset.willLater === 'false' || !this.currentSlide.dataset.willLater) {
      this.target.style.opacity = '0.8';
      this.currentSlide.querySelector('.will-watch-confrim').style.backgroundImage = 'url("image/icon/v.png")';
      this.currentSlide.querySelector('.will-watch-confrim').style.opacity = '1';
      this.currentSlide.dataset.willLater = 'true';
      this.addDataArray(this.myWillWatch, this.currentSlide);
    } else if (this.currentSlide.dataset.willLater === 'true' && this.target.closest('.will-watch')) {
      this.target.style.opacity = '0.3';
      this.currentSlide.querySelector('.will-watch-confrim').style.backgroundImage = 'url("image/icon/time.png")';
      this.currentSlide.querySelector('.will-watch-confrim').style.opacity = '0.3';
      this.currentSlide.dataset.willLater = 'false';
      this.changeArray(this.myWillWatch);
    }
  }

  checkList(event) {
    this.target = event.target;
    this.currentSlide = this.target.closest('.swiper-slide');
    if (this.target.classList.contains('love-movie-button')) {
      this.changeFavorite();
    }
    if (this.target.closest('.will-watch')) {
      this.changeWillLater();
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
    this.createCardListMovie(this.myWillWatch);
  }

  createFavoriteMovie() {
    document.querySelector('.watch-later').classList.remove('active-tab');
    document.querySelector('.favorite-movie').classList.add('active-tab');
    document.querySelector('.list-movie').innerHTML = '';
    this.activeTab = false;
    this.createCardListMovie(this.myLoveMovie);
  }

  createCardListMovie(listArray) {
    this.listArray = listArray;
    this.listArray.forEach((item) => {
      const newMovie = this.listMovieCopy.cloneNode(true);
      newMovie.dataset.idMovie = item.id;
      newMovie.querySelector('.poster-list-movie').style.backgroundImage = item.poster;
      newMovie.querySelector('.title-list-movie').textContent = `${item.title} ${item.year}`;
      newMovie.querySelector('.title-list-movie').href = item.href;
      newMovie.querySelector('.poster-list-movie').href = item.href;
      newMovie.querySelector('.plot-list-movie').innerHTML = item.plot;
      document.querySelector('.list-movie').prepend(newMovie);
    });
  }
}

const addList = new Addlist();
addList.createDOM();
addList.addEventListener();

export default addList;
