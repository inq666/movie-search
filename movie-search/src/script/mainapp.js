
import addlistmovie from './add-list-movie';
import swiper from './swiper/swiper';

class MainApp {
  constructor() {
    this.page = 1;
    this.numSlide = 1;
    this.clear = false;
    this.microActive = false;
    this.currentMovie = 'naruto';
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new window.SpeechRecognition();
    this.recognition.lang = 'en-US';
  }

  createDOM() {
    this.search = document.querySelector('.search');
    this.loader = document.querySelector('.animation-container');
    this.speakButton = document.querySelector('.button-disable-microphone');
    this.swiperWrapper = document.querySelector('.swiper-wrapper');
    this.sliderCopy = document.querySelector('.swiper-slide');
    this.sliderCopy.remove();
  }

  addEventListener() {
    this.speakButton.addEventListener('click', () => this.activeMicrophone());
    this.recognition.addEventListener('result', (event) => this.recording(event));
    this.recognition.addEventListener('end', () => {
      if (this.microActive) this.recognition.start();
    });
    window.addEventListener('mousedown', (event) => this.countSlides(event));
    window.addEventListener('mouseover', (event) => this.visibilityInfo(event));
  }

  visibilityInfo(event) {
    if (event.target.classList.contains('movie-info-button')) {
      this.target = event.target.closest('.swiper-slide').querySelector('.movie-info');
      this.target.style.opacity = '1';
    } else if (this.target && !event.target.classList.contains('movie-info-button')) {
      this.target.style.opacity = '0';
    }
  }

  activeMicrophone() {
    if (!this.microActive) {
      this.microActive = true;
      this.recognition.start();
      document.querySelector('.button-microphone').style.opacity = '0';
      this.speakButton.style.opacity = '1';
      this.search.input.focus();
    } else {
      this.microActive = false;
      this.recognition.stop();
      document.querySelector('.button-microphone').style.opacity = '1';
      this.speakButton.style.opacity = '0';
    }
  }

  recording(event) {
    this.nameMovie = event.results[0][0].transcript;
    if (event.results[0].isFinal) {
      this.search.input.value = this.nameMovie.split(',');
    }
  }

  countSlides(event) {
    if (event.target.closest('.swiper-container') || event.target.classList.contains('swiper-button-next')) {
      if (swiper.activeIndex > this.numSlide) {
        this.page += 1;
        this.numSlide = swiper.activeIndex;
        this.getMovie();
      }
    }
  }

  async getMovie() {
    if (this.page === 1) {
      this.loader.style.display = 'block';
    }
    this.url = `http://www.omdbapi.com/?s=${this.currentMovie}&type=movie&page=${this.page}&apikey=fcfd9227`;
    const res = await fetch(this.url);
    this.data = await res.json();
    this.getDataMovie();
  }

  async getDataMovie() {
    this.checkAvailable();
    if (this.finish) {
      this.finish = false;
      return;
    }
    this.arrRate = [];
    this.dataMovie = [];
    for (let z = 0; z < this.data.Search.length; z += 1) {
      this.arrRate.push(`http://www.omdbapi.com/?i=${this.data.Search[z].imdbID}&apikey=fcfd9227`);
    }
    const requests = this.arrRate.map((url) => fetch(url));
    await Promise.all(requests)
      .then((responses) => Promise.all(responses.map((data) => data.json())))
      .then((item) => item.forEach((rating) => this.dataMovie.push(rating)));
    this.createCardMovie();
  }

  checkAvailable() {
    if (this.data.Response === 'False') {
      if (this.page === 1) {
        document.querySelector('.search-result').innerHTML = `No results found for "<b>${this.currentMovie}</b>"`;
        if (this.data.Error === 'Too many results.') {
          document.querySelector('.search-result').innerHTML = 'Too many results.';
        }
        document.querySelector('.search-result-found').innerHTML = 'Found 0 results';
      }
      setTimeout(() => {
        this.loader.style.display = 'none';
      }, 500);
      this.finish = true;
    }
    if (this.clear) {
      swiper.slideTo(1, 1);
      this.swiperWrapper.innerHTML = '';
      this.clear = false;
    }
  }

  createCardMovie() {
    if (this.data.Response === 'False') return;
    for (let i = 0; i < this.data.Search.length; i += 1) {
      this.newSlide = this.sliderCopy.cloneNode(true);
      this.newSlide.querySelector('.movie-title').textContent = this.data.Search[i].Title;
      this.newSlide.querySelector('.movie-title').href = `http://www.imdb.com/title/${this.data.Search[i].imdbID}/videogallery/`;
      this.newSlide.querySelector('.movie-image').href = `http://www.imdb.com/title/${this.data.Search[i].imdbID}/videogallery/`;
      this.newSlide.querySelector('.movie-year').textContent = `${this.data.Search[i].Year}, ${this.dataMovie[i].Country}`;
      this.newSlide.querySelector('.movie-rate').innerHTML = `<b>${this.dataMovie[i].imdbRating}</b>`;
      this.createInfoForMovie(i);
    }
    this.resetSlider();
  }

  resetSlider() {
    document.querySelector('.search-result').innerHTML = `Results for "<b>${this.currentMovie}</b>"`;
    document.querySelector('.search-result-found').innerHTML = `Found ${this.data.totalResults} results`;
    swiper.update();
    setTimeout(() => {
      this.loader.style.display = 'none';
    }, 500);
  }

  createInfoForMovie(i) {
    const posterUnavailable = 'N/A';
    this.newSlide.querySelector('.name').textContent = `${this.data.Search[i].Title} (${this.data.Search[i].Year})`;
    this.newSlide.querySelector('.name').href = `http://www.imdb.com/title/${this.data.Search[i].imdbID}/?ref_=fn_al_tt_1`;
    this.newSlide.querySelector('.description').innerHTML = `<b>Plot:</b> ${this.dataMovie[i].Plot}`;
    this.newSlide.querySelector('.genre').innerHTML = `<b>Genre:</b> ${this.dataMovie[i].Genre}`;
    this.newSlide.querySelector('.type-movie').innerHTML = this.dataMovie[i].Type;
    this.newSlide.querySelector('.run-time').innerHTML = `<b>Runtime:</b> ${this.dataMovie[i].Runtime}`;
    this.newSlide.querySelector('.rate').innerHTML = `<b>Rated:</b> ${this.dataMovie[i].Rated}`;
    this.newSlide.querySelector('.actors').innerHTML = `<b>Actors:</b> ${this.dataMovie[i].Actors}`;
    this.newSlide.dataset.id = this.data.Search[i].imdbID;
    this.swiperWrapper.append(this.newSlide);
    if (this.data.Search[i].Poster !== posterUnavailable) {
      this.newSlide.querySelector('.movie-image').style.backgroundImage = `url(${this.data.Search[i].Poster})`;
      this.checkMovie();
    }
  }

  checkMovie() {
    addlistmovie.myLoveMovie.forEach((item) => {
      if (item.id === this.newSlide.dataset.id) {
        this.newSlide.querySelector('.love-movie-button').style.opacity = '1';
        this.newSlide.dataset.favorite = 'true';
      }
    });
    addlistmovie.myWillWatch.forEach((item) => {
      if (item.id === this.newSlide.dataset.id) {
        this.newSlide.querySelector('.will-watch').style.opacity = '0.8';
        this.newSlide.querySelector('.will-watch-confrim').style.backgroundImage = 'url("image/icon/v.png")';
        this.newSlide.querySelector('.will-watch-confrim').style.opacity = '1';
        this.newSlide.dataset.willLater = 'true';
      }
    });
  }
}

const mainapp = new MainApp();
mainapp.createDOM();
mainapp.addEventListener();
mainapp.getMovie();

export default mainapp;
