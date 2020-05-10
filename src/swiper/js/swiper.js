const swiper = new Swiper('.swiper-container', {
  speed: 900,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    720: {
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 10,
    },
    1110: {
      slidesPerGroup: 2,
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1330: {
      slidesPerGroup: 3,
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
});
