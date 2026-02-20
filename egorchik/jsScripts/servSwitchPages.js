const diagnosticsPage = document.querySelector('.main__diagnostics');
const acceptancePage = document.querySelector('.main__acceptance');

const questionBorder = document.querySelectorAll('.main__question-border');
const servBorder = document.querySelectorAll('.main__service-border');

questionBorder.forEach((el) => {
    el.addEventListener('click', () => {
        diagnosticsPage.classList.add('hidden');
        el.classList.remove('switch-border');
        acceptancePage.classList.remove('hidden');
    })
})

servBorder.forEach((el) => {
    el.addEventListener('click', () => {
        diagnosticsPage.classList.remove('hidden');
        acceptancePage.classList.add('hidden');
    })
})