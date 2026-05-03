const openEditBtn = document.querySelector('.grids-zakaz1 > button');

let openEditFunc = (el, btn) => {
    el.forEach((n) => {
        n.style.display = 'block';
    })
    btn.textContent = 'НАЗАД'
}

let closeEditFunc = (el, btn) => {
    el.forEach((n) => {
        n.style.display = 'none';
    })
    btn.textContent = 'ИЗМЕНИТЬ'
}

openEditBtn.addEventListener('click', () => {
    let hiddenEditEl = document.querySelectorAll('.edit-tools');

    openEditBtn.classList.toggle('active-edit');

    if (openEditBtn.classList.contains('active-edit')) {
        openEditFunc(hiddenEditEl, openEditBtn)
    } else {
        closeEditFunc(hiddenEditEl, openEditBtn)
    }
})