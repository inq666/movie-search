class MovieSearch {
  constructor() {
    this.page = 1;
    this.currentMovie = 'naruto';
    this.count = 0;
  }

  createDOM() {
    this.input = document.querySelector('.search');
    this.swiperWrapper = document.querySelector('.swiper-wrapper');
    this.sliderCopy = document.querySelector('.swiper-slide');
    this.searchButton = document.querySelector('.button-search');
    this.sliderCopy.remove();
  }

  addEventListener() {
    document.querySelector('.swiper-button-prev').addEventListener('click', () => {
      if (this.count) this.count -= 1;
    });
    document.querySelector('.swiper-button-next').addEventListener('click', () => this.countSlides());
    this.searchButton.addEventListener('click', () => this.enterInput());
  }

  async enterInput() {
    this.currentMovie = this.input.value;
    if (!this.currentMovie) return;
    if (/[а-я]/i.test(this.currentMovie)) {
      const response = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200422T174219Z.a6338781f9423192.28f2896df71fd9376630fd91e64a03518d511f99&text= ${this.currentMovie} &lang=ru-en`);
      const json = await response.json();
      this.currentMovie = json.text[0].trim();
    }
    this.swiperWrapper.innerHTML = '';
    this.getMovie();
  }

  countSlides() {
    this.count += 1;
    if (this.count >= 0 && this.count % 2) {
      this.page += 1;
      this.getMovie();
    }
  }

  async getMovie() {
    this.count = 0;
    this.page = 1;
    this.url = `https://www.omdbapi.com/?s=${this.currentMovie}&page=${this.page}&apikey=fb708ae0`;
    const res = await fetch(this.url);
    this.data = await res.json();
    this.createItemMovie();
  }

  async createItemMovie() {
    for (let i = 0; i < this.data.Search.length; i += 1) {
      const newSlide = this.sliderCopy.cloneNode(true);
      newSlide.querySelector('.movie-title').textContent = this.data.Search[i].Title;
      newSlide.querySelector('.movie-title').href = `https://www.imdb.com/title/${this.data.Search[i].imdbID}/?ref_=ttvi_tt`;
      newSlide.querySelector('.movie-image').href = `https://www.imdb.com/title/${this.data.Search[i].imdbID}/?ref_=ttvi_tt`;
      newSlide.querySelector('.movie-year').textContent = this.data.Search[i].Year;
      newSlide.querySelector('.movie-image').style.backgroundImage = `url(${this.data.Search[i].Poster})`;
      const res = await fetch(`http://www.omdbapi.com/?i=${this.data.Search[i].imdbID}&apikey=fb708ae0`);
      const json = await res.json();
      newSlide.querySelector('.movie-rate').textContent = json.imdbRating;
      this.swiperWrapper.append(newSlide);
    }
    swiper.update();
  }
}

const movieSearch = new MovieSearch();
movieSearch.createDOM();
movieSearch.addEventListener();
movieSearch.getMovie();
