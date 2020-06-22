class Api {
  static translate(str) {
    const word = str;
    if (/[а-я]/i.test(word)) {
      const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200422T174219Z.a6338781f9423192.28f2896df71fd9376630fd91e64a03518d511f99&text= ${word} &lang=ru-en`;
      fetch(url)
        .then(res => res.json())
        .then(data => {
          return data.text;
        });
    }
    return 'it is an english word';
  }
}

module.exports = Api;
