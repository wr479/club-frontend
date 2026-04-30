const openBtn3 = document.querySelector('.for-popupThrd-btn');

if (openBtn3) {
    openBtn3.addEventListener('click', () => {
        const popup3 = document.querySelector('.modal-overlay-thrd');
        const popupAcceptThrd = document.querySelector('.pop-up2-thrd');
        const closePopupThrd = document.querySelectorAll('.krest');

        if (!popup3.style.display === 'flex') {
            popup3.style.display = 'none'
        }

        popup3.style.display = 'flex';

        closePopupThrd.forEach((el) => {
            el.addEventListener('click', () => {
                popup3.style.display = 'none';
        }   )
        })

        const popupThrdForm = document.querySelector('.input-section3');
        const popup3Content = document.querySelector('.modal-overlay-thrd > .pop-up1');

        switchDisplay(popup3Content, popupAcceptThrd)

        popupThrdForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const formdata = new FormData(popupThrdForm);
            const userFormData = Object.fromEntries(formdata)
            console.log(userFormData)

            fetch('http://localhost:3000/api/feedback', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(userFormData)
            })

            switchDisplay(popupAcceptThrd, popup3Content)
        })
    })
}

fetch('http://localhost:3000/api/admin/feedback')
    .then(response => response.json())
    .then(json => console.log(json))


