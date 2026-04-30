const orderedPages = document.querySelectorAll('.sortpages-page.for-order > .accum-info > h1');
orderedPages.forEach(function (e) {
    e.style.color = 'rgba(29, 29, 29, 1)';
});

const availiblePages = document.querySelectorAll('.sortpages-page.in-availebility > .accum-info > h1');
availiblePages.forEach(function (e) {
    e.style.color = 'rgba(29, 29, 29, 1)';
})

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
