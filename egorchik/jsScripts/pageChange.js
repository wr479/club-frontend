const orderedPages = document.querySelectorAll('.sortpages-page.for-order > .accum-info > h1');
orderedPages.forEach(function (e) {
    e.style.color = 'rgba(29, 29, 29, 1)';
});

const availiblePages = document.querySelectorAll('.sortpages-page.in-availebility > .accum-info > h1');
availiblePages.forEach(function (e) {
    e.style.color = 'rgba(29, 29, 29, 1)';
})

const hideBtn = document.querySelectorAll('.choosen-bucket-btn-cont');
hideBtn.forEach(function (btn) {
    btn.addEventListener('click', function() {
        const cont = btn.closest('.sortpages-page');
        if (cont) {
            const hideTheContent = cont.querySelector('.choosen-addItem-btn-cont');
            const btnAfterClick = cont.querySelector('.choosen-bucket-btn-cont');
            const contAfterClick = cont.querySelector('.choosen-bucket-btn-cont-hidden');
            hideTheContent.style.visibility = 'hidden';
            btnAfterClick.style.display = 'none';
            contAfterClick.style.display = 'flex';
        }
    }, false);
});

const allCatalog = document.querySelector('.pages-grid');
allCatalog.addEventListener('click', (event) => {
    const target = event.target

    const choosenCard = target.closest('.choosen-addItem-btn-cont')
    if (!choosenCard) return

    let localCounter = choosenCard.querySelector('#counter');

    if (target.classList.contains('increment')) {
        localCounter.textContent++
    } else if (target.classList.contains('decrement')) {
        if (localCounter.textContent > 0) {
            localCounter.textContent--
        }
    }
})
