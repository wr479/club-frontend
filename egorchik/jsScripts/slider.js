const upperSlider = new Swiper('.swiper1', {

    direction: 'horizontal',
    loop: true,
    mousewheel: false,
    speed: 600,
    effect: 'slide',
    slidesPerView: 1,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'bullets',
    },

    scrollbar: {
        el: '.swiper-scrollbar',
        hide: true
    },

    autoplay: {
        delay: 6000,
        disableOnInteraction: false,
    },
    },);