import search from './script/search.js';
import keyboard from './keyboard/keyboard.js';
import listMovie from './script/add-list-movie.js';

class MainApp {
  constructor() {
    this.page = 1;
    this.numSlide = 1;
    this.microActive = false;
    this.currentMovie = 'naruto';
    window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
    this.recognition = new window.SpeechRecognition();
    this.recognition.lang = 'en-US';
  }

  createDOM() {
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
      search.input.focus();
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
      search.input.value = this.nameMovie.split(',');
    }
  }

  countSlides(event) {
    if (event.target.closest('.swiper-container') || event.target.classList.contains('swiper-button-next')) {
      if (!(swiper.activeIndex % 3) && swiper.activeIndex > this.numSlide) {
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
    this.url = `https://www.omdbapi.com/?s=${this.currentMovie}&page=${this.page}&apikey=fb708ae0`;
    const res = await fetch(this.url);
    this.data = await res.json();
    this.getDataMovie();
  }

  async getDataMovie() {
    if (this.data.Response === 'False') {
      if (this.page === 1) {
        document.querySelector('.search-result').innerHTML = `No results found for "<b>${this.currentMovie}</b>"`;
        document.querySelector('.search-result-found').innerHTML = 'Found 0 results';
      }
      setTimeout(() => {
        this.loader.style.display = 'none';
      }, 500);
      return;
    }
    if (search.clear) {
      swiper.slideTo(1, 1);
      this.swiperWrapper.innerHTML = '';
      search.clear = false;
    }
    this.arrRate = [];
    this.dataMovie = [];
    for (let z = 0; z < this.data.Search.length; z += 1) {
      this.arrRate.push(`http://www.omdbapi.com/?i=${this.data.Search[z].imdbID}&apikey=fb708ae0`);
    }
    const requests = this.arrRate.map((url) => fetch(url));
    await Promise.all(requests)
      .then((responses) => Promise.all(responses.map((data) => data.json())))
      .then((item) => item.forEach((rating) => this.dataMovie.push(rating)));
    this.createCardMovie();
  }

  createCardMovie() {
    const posterUnavailable = 'N/A';
    for (let i = 0; i < this.data.Search.length; i += 1) {
      const newSlide = this.sliderCopy.cloneNode(true);
      newSlide.querySelector('.movie-title').textContent = this.data.Search[i].Title;
      newSlide.querySelector('.movie-title').href = `https://www.imdb.com/title/${this.data.Search[i].imdbID}/videogallery/`;
      newSlide.querySelector('.movie-image').href = `https://www.imdb.com/title/${this.data.Search[i].imdbID}/videogallery/`;
      newSlide.querySelector('.movie-year').textContent = `${this.data.Search[i].Year}, ${this.dataMovie[i].Country}`;
      newSlide.querySelector('.movie-rate').innerHTML = `<b>${this.dataMovie[i].imdbRating}</b>`;

      newSlide.querySelector('.name').textContent = `${this.data.Search[i].Title} (${this.data.Search[i].Year})`;
      newSlide.querySelector('.name').href = `https://www.imdb.com/title/${this.data.Search[i].imdbID}/?ref_=fn_al_tt_1`;
      newSlide.querySelector('.description').innerHTML = `<b>Plot:</b> ${this.dataMovie[i].Plot}`;
      newSlide.querySelector('.genre').innerHTML = `<b>Genre:</b> ${this.dataMovie[i].Genre}`;
      newSlide.querySelector('.type-movie').innerHTML = this.dataMovie[i].Type;
      newSlide.querySelector('.run-time').innerHTML = `<b>Runtime:</b> ${this.dataMovie[i].Runtime}`;
      newSlide.querySelector('.rate').innerHTML = `<b>Rated:</b> ${this.dataMovie[i].Rated}`;
      newSlide.querySelector('.actors').innerHTML = `<b>Actors:</b> ${this.dataMovie[i].Actors}`;
      newSlide.dataset.id = this.data.Search[i].imdbID;
      this.swiperWrapper.append(newSlide);
      if (this.data.Search[i].Poster !== posterUnavailable) {
        newSlide.querySelector('.movie-image').style.backgroundImage = `url(${this.data.Search[i].Poster})`;
        this.checkMovie(newSlide);
      }
    }
    document.querySelector('.search-result').innerHTML = `Results for "<b>${this.currentMovie}</b>"`;
    document.querySelector('.search-result-found').innerHTML = `Found ${this.data.totalResults} results`;
    swiper.update();
    setTimeout(() => {
      this.loader.style.display = 'none';
    }, 500);
  }

  checkMovie(slide) {
    listMovie.myLoveMovie.forEach((item) => {
      if (item.id === slide.dataset.id) {
        slide.querySelector('.love-movie-button').style.opacity = '1';
        slide.dataset.favorite = 'true';
      }
    })

    listMovie.myWillWatch.forEach((item) => {
      if (item.id === slide.dataset.id) {
        slide.querySelector('.will-watch').style.opacity = '0.8';
        slide.querySelector('.will-watch-confrim').style.backgroundImage = 'url("image/icon/v.png")';
        slide.querySelector('.will-watch-confrim').style.opacity = '1';
        slide.dataset.willLater = 'true';
      }
    })
  }
}

const movieSearch = new MainApp();
movieSearch.createDOM();
movieSearch.addEventListener();
movieSearch.getMovie();

export default movieSearch;
