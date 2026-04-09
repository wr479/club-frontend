const openBtn = document.querySelector('.nav-button > button');

openBtn.addEventListener('click', () => {
    const popup1 = document.querySelector('.modal-overlay');
    const closePopup = document.querySelector('.krest');

    if (!popup1.style.display === 'flex') {
        popup1.style.display = 'none'
    }

    popup1.style.display = 'flex';

    closePopup.addEventListener('click', () => {
        popup1.style.display = 'none';
    })
    
    const popupForm = document.querySelector('.input-section');

    popupForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formdata = new FormData(popupForm);
        const userFormData = Object.fromEntries(formdata)
        console.log(userFormData)
    })
})

