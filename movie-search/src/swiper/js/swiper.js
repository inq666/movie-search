const swiper = new Swiper('.swiper-container', {
  speed: 900,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    720: {
      slidesPerGroup: 2,
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1110: {
      slidesPerGroup: 3,
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1330: {
      slidesPerGroup: 3,
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },
});
