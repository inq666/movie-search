import search from './script/search.js';

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
    this.speakButton = document.querySelector('.button-microphone');
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
      this.speakButton.classList.add('microphone-active');
      this.speakButton.style.opacity = '0';
      document.querySelector('.button-disable-microphone').style.opacity = '1';
      search.input.focus();
    } else {
      this.microActive = false;
      this.recognition.stop();
      this.speakButton.classList.remove('microphone-active');
      this.speakButton.style.opacity = '1';
      document.querySelector('.button-disable-microphone').style.opacity = '0';
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
    const arrRate = [];
    for (let z = 0; z < this.data.Search.length; z += 1) {
      arrRate.push(`http://www.omdbapi.com/?i=${this.data.Search[z].imdbID}&apikey=fb708ae0`);
    }
    let jsonRate = [];
    const requests = arrRate.map((url) => fetch(url));
    await Promise.all(requests)
      .then((responses) => Promise.all(responses.map((data) => data.json())))
      .then((item) => item.forEach((rating) => jsonRate.push(rating.imdbRating)));
    for (let i = 0; i < this.data.Search.length; i += 1) {
      const newSlide = this.sliderCopy.cloneNode(true);
      newSlide.querySelector('.movie-title').textContent = this.data.Search[i].Title;
      newSlide.querySelector('.movie-title').href = `https://www.imdb.com/title/${this.data.Search[i].imdbID}/videogallery/`;
      newSlide.querySelector('.movie-image').href = `https://www.imdb.com/title/${this.data.Search[i].imdbID}/videogallery/`;
      newSlide.querySelector('.movie-year').textContent = this.data.Search[i].Year;
      newSlide.querySelector('.movie-image').style.backgroundImage = `url(${this.data.Search[i].Poster})`;
      newSlide.querySelector('.movie-rate').textContent = jsonRate[i];
      this.swiperWrapper.append(newSlide);
    }
    jsonRate = [];
    swiper.update();
  }
}

const movieSearch = new MainApp();
movieSearch.createDOM();
movieSearch.addEventListener();
movieSearch.getMovie();


export default movieSearch;
