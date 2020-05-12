import mainApp from '../script.js';

class Search {
  createDOM() {
    this.input = document.querySelector('.search');
    this.clearButton = document.querySelector('.button-clear');
    this.searchButton = document.querySelector('.button-search');
  }

  addEventListener() {
    this.searchButton.addEventListener('click', () => this.enterInput());
    this.clearButton.addEventListener('click', () => {
      this.input.value = '';
    });
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Enter') this.enterInput();
    });
    document.addEventListener('click', (event) => {
      if (event.target.closest('.enter')) this.enterInput();
    });
  }

  async enterInput() {
    mainApp.currentMovie = this.input.value;
    if (!mainApp.currentMovie) return;
    if (/[а-я]/i.test(mainApp.currentMovie)) {
      const response = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200422T174219Z.a6338781f9423192.28f2896df71fd9376630fd91e64a03518d511f99&text= ${mainApp.currentMovie} &lang=ru-en`);
      const json = await response.json();
      mainApp.currentMovie = json.text[0].trim();
    }
    mainApp.numSlide = 0;
    this.clear = true;
    document.querySelector('.button-microphone').style.opacity = '1';
    mainApp.speakButton.style.opacity = '0';
    mainApp.microActive = false;
    mainApp.recognition.stop();
    mainApp.page = 1;
    mainApp.getMovie();
  }
}

const search = new Search();
search.createDOM();
search.addEventListener();

export default search;
