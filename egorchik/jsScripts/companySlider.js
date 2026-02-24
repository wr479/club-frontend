const compSwiper = new Swiper('.swiper', {

    direction: 'horizontal',
    loop: true,
    mousewheel: false,
    speed: 600,
    effect: 'slide',

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
})