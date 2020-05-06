var swiper = new Swiper('.swiper-container', {
  speed: 900,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    320: {
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 15,
    },
    450: {
      slidesPerGroup: 2,
      slidesPerView: 2,
      spaceBetween: 20,
    },
    620: {
      slidesPerGroup: 3,
      slidesPerView: 3,
      spaceBetween: 20,
    },
    800: {
      slidesPerGroup: 4,
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },
});


