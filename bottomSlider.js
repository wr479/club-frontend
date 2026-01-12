const bottomSlider = new Swiper('.bottom-swiper', {

    direction: 'horizontal',
    loop: true,
    mousewheel: false,
    speed: 600,
    effect: 'slide',
    spaceBetween: 0,
    slidesPerView: 5,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
})