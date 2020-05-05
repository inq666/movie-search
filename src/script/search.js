import mainApp from '../script.js';

class Search {
  constructor() {
    this.name = '123';
  }

  createDOM() {
    this.input = document.querySelector('.search');
    this.clearButton = document.querySelector('.button-clear');
    this.searchButton = document.querySelector('.button-search');
  }

  addEventListener() {
    this.clearButton.addEventListener('click', () => {
      this.input.value = '';
    });
    this.searchButton.addEventListener('click', () => this.enterInput());
  }

  async enterInput() {
    mainApp.currentMovie = this.input.value;
    if (!mainApp.currentMovie) return;
    if (/[а-я]/i.test(mainApp.currentMovie)) {
      const response = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200422T174219Z.a6338781f9423192.28f2896df71fd9376630fd91e64a03518d511f99&text= ${mainApp.currentMovie} &lang=ru-en`);
      const json = await response.json();
      mainApp.currentMovie = json.text[0].trim();
    }
    mainApp.getMovie();
    this.input.value = '';
    mainApp.swiperWrapper.innerHTML = '';
  }
}

const search = new Search();
search.createDOM();
search.addEventListener();

export default search;
