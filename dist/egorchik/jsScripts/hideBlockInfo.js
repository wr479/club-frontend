const hideBlockNextBtn = document.querySelector('.cont-for-img-in_strelki_second');
const hideBlockPrevBtn = document.querySelector('.cont-for-img-in_strelki');
const hideBlockWorkField = document.querySelector('#hideHide');

hideBlockNextBtn.addEventListener('click', () => {
    hideBlockWorkField.classList.add('hidden');


    setTimeout(() => {
        hideBlockWorkField.innerHTML = `
                <div id="hideHide" class="news_second-block container">
                    <div class="first-cont-for_koleso">
                        <div class="cont-for-logo_fotka">
                            <img src="../images-header/logo.svg" alt="">
                        </div>
                    </div>
                    <div class="second-cont-for_text container">
                        <div class="cont-for-first_text">
                            <p>24 февраля 2020 года</p>
                        </div>
                        <div class="cont-for-second_text container">
                            <p>Мы привыкли эксплуатировать автомобиль, пока что-либо не сломается. Так и со щётками - не заменим, пока совсем не потеряем возможность видеть перед собой из-за грязного лобового стекла. Следите за своими щётками и меняйте их каждый сезон, ведь безопасность на дороге превыше всего!</p>
                        </div>
                    </div>
                </div>
    `;
    hideBlockWorkField.classList.remove('hidden');
    }, 300);
})

hideBlockPrevBtn.addEventListener('click', () => {
    hideBlockWorkField.classList.add('hidden');


    setTimeout(() => {
        hideBlockWorkField.innerHTML = `
                <div id="hideHide" class="news_second-block container">
                    <div class="first-cont-for_koleso">
                        <div class="cont-for-logo_fotka">
                            <img src="../images-header/logo.svg" alt="">
                        </div>
                    </div>
                    <div class="second-cont-for_text container">
                        <div class="cont-for-first_text">
                            <p>24 февраля 2020 года</p>
                        </div>
                        <div class="cont-for-second_text container">
                            <p>Мы привыкли эксплуатировать автомобиль, пока что-либо не сломается. Так и со щётками - не заменим, пока совсем не потеряем возможность видеть перед собой из-за грязного лобового стекла. Следите за своими щётками и меняйте их каждый сезон, ведь безопасность на дороге превыше всего!</p>
                        </div>
                    </div>
                </div>
    `;
    hideBlockWorkField.classList.remove('hidden');
    }, 300);
})