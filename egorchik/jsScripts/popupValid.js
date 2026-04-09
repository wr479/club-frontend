const openBtn = document.querySelector('.nav-button > button');

function switchDisplay(el1, el2) {
    el1.style.display = 'block';
    el2.style.display = 'none'
}

openBtn.addEventListener('click', () => {
    const popup1 = document.querySelector('.modal-overlay');
    const popupAccept = document.querySelector('.pop-up2');
    const closePopup = document.querySelectorAll('.krest');

    if (!popup1.style.display === 'flex') {
        popup1.style.display = 'none'
    }

    popup1.style.display = 'flex';

    closePopup.forEach((el) => {
        el.addEventListener('click', () => {
            popup1.style.display = 'none';
    }   )
    })
    
    const popupForm = document.querySelector('.input-section');
    const popup1Content = document.querySelector('.pop-up1');

    switchDisplay(popup1Content, popupAccept)

    popupForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formdata = new FormData(popupForm);
        const userFormData = Object.fromEntries(formdata)
        console.log(userFormData)

        switchDisplay(popupAccept, popup1Content)
    })
})

