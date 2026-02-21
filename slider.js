new Swiper('.swiper-container', {

    direction: 'horizontal',
    loop: true,
    mousewheel: false,
    speed: 600,
    effect: 'slide',

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