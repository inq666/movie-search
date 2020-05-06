import search from './script/search.js';
import keyboard from './keyboard/keyboard.js';

class MainApp {
  constructor() {
    this.page = 1;
    this.microActive = false;
    this.currentMovie = 'naruto';
    this.count = 0;
    this.currentCount = 0;
    window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
    this.recognition = new window.SpeechRecognition();
    this.recognition.lang = 'en-US';
  }

  createDOM() {
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
    document.querySelector('.swiper-button-next').addEventListener('click', () => this.countSlides());
    document.querySelector('.swiper-button-prev').addEventListener('click', () => {
      if (this.count) this.count -= 1;
    });
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

  countSlides() {
    this.count += 1;
    if (this.count > this.currentCount) {
      this.currentCount = this.count;
      this.page += 1;
      this.getMovie();
    }
  }

  async getMovie() {
    this.url = `https://www.omdbapi.com/?s=${this.currentMovie}&page=${this.page}&apikey=fb708ae0`;
    const res = await fetch(this.url);
    this.data = await res.json();
    this.createItemMovie();
  }

  async createItemMovie() {
    if (this.data.Response === 'False') {
      if (this.page === 1) {
        document.querySelector('.search-result').innerHTML = `No results found for "<b>${this.currentMovie}</b>"`;
        document.querySelector('.search-result-found').innerHTML = 'Found 0 results';
      }
      return;
    }
    if (search.clear) {
      swiper.slideTo(1, 1);
      this.swiperWrapper.innerHTML = '';
      search.clear = false;
    }
    const arrRate = [];
    for (let z = 0; z < this.data.Search.length; z += 1) {
      arrRate.push(`http://www.omdbapi.com/?i=${this.data.Search[z].imdbID}&apikey=fb708ae0`);
    }
    let jsonRate = [];
    const requests = arrRate.map((url) => fetch(url));
    await Promise.all(requests)
      .then((responses) => Promise.all(responses.map((data) => data.json())))
      .then((item) => item.forEach((rating) => jsonRate.push(rating)));
    for (let i = 0; i < this.data.Search.length; i += 1) {
      const newSlide = this.sliderCopy.cloneNode(true);
      newSlide.querySelector('.movie-title').textContent = this.data.Search[i].Title;
      newSlide.querySelector('.movie-title').href = `https://www.imdb.com/title/${this.data.Search[i].imdbID}/videogallery/`;
      newSlide.querySelector('.movie-image').href = `https://www.imdb.com/title/${this.data.Search[i].imdbID}/videogallery/`;
      newSlide.querySelector('.movie-year').textContent = `${this.data.Search[i].Year}, ${jsonRate[i].Country}`;
      newSlide.querySelector('.movie-rate').innerHTML = `<b>${jsonRate[i].imdbRating}</b>`;
      this.swiperWrapper.append(newSlide);
      if (this.data.Search[i].Poster !== 'N/A') {
        newSlide.querySelector('.movie-image').style.backgroundImage = `url(${this.data.Search[i].Poster})`;
      }
    }
    document.querySelector('.search-result').innerHTML = `Results for "<b>${this.currentMovie}</b>"`;
    document.querySelector('.search-result-found').innerHTML = `Found ${this.data.totalResults} results`;
    jsonRate = [];
    swiper.update();
  }
}

const movieSearch = new MainApp();
movieSearch.createDOM();
movieSearch.addEventListener();
movieSearch.getMovie();


export default movieSearch;
