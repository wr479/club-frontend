// const pageItemSlider = new Swiper('.item-swiper', {
    
//     direction: 'horizontal',
//     loop: true,
//     mousewheel: false,
//     speed: 600,
//     effect: 'slide',
//     slidesPerView: 1,

//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },
// },)


var itemSlider = null;

function initItemSlider() {
    var swiperContainer = document.querySelector('.item-swiper');
    if (!swiperContainer) return false;
    
    var popup = document.querySelector('.overlay-shell');
    var isVisible = popup && window.getComputedStyle(popup).display !== 'none';
    
    if (isVisible && !itemSlider) {
        try {
            itemSlider = new Swiper('.item-swiper', {
                direction: 'horizontal',
                loop: true,
                speed: 600,
                slidesPerView: 1,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
            });
            console.log('Swiper инициализирован');
        } catch(e) {
            console.error(e);
        }
    } else if (isVisible && itemSlider) {
        itemSlider.update();
    }
}

setInterval(initItemSlider, 500);