const pageItemSlider = new Swiper('.item-swiper', {
    
    direction: 'horizontal',
    loop: true,
    mousewheel: false,
    speed: 600,
    effect: 'slide',
    slidesPerView: 1,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
},)