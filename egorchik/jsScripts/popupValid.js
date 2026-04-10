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

// second popup

const openBtn2 = document.querySelector('.for-popupSec-btn');

if (openBtn2) {
    openBtn2.addEventListener('click', () => {
        console.log('btn pressed')
        const popup2 = document.querySelector('.modal-overlay-sec');
        const popupAcceptSec = document.querySelector('.pop-up2-sec');
        const closePopupSec = document.querySelectorAll('.krest');

        if (!popup2.style.display === 'flex') {
            popup2.style.display = 'none'
        }

        popup2.style.display = 'flex';

        closePopupSec.forEach((el) => {
            el.addEventListener('click', () => {
                popup2.style.display = 'none';
        }   )
        })

        const popupSecForm = document.querySelector('.input-section2');
        const popup2Content = document.querySelector('.modal-overlay-sec > div');

        switchDisplay(popup2Content, popupAcceptSec)

        popupSecForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const formdata = new FormData(popupSecForm);
            const userFormData = Object.fromEntries(formdata)
            console.log(userFormData)

            switchDisplay(popupAcceptSec, popup2Content)
        })
    })
}

// openBtn2.addEventListener('click', () => {
//     console.log('btn pressed')
//     const popup2 = document.querySelector('.modal-overlay-sec');
//     const popupAcceptSec = document.querySelector('.pop-up2-sec');
//     const closePopupSec = document.querySelectorAll('.krest');

//     if (!popup2.style.display === 'flex') {
//         popup2.style.display = 'none'
//     }

//     popup2.style.display = 'flex';

//     closePopupSec.forEach((el) => {
//         el.addEventListener('click', () => {
//             popup2.style.display = 'none';
//     }   )
//     })

//     const popupSecForm = document.querySelector('.input-section2');
//     const popup2Content = document.querySelector('.modal-overlay-sec > div');

//     switchDisplay(popup2Content, popupAcceptSec)

//     popupSecForm.addEventListener('submit', (event) => {
//         event.preventDefault();

//         const formdata = new FormData(popupSecForm);
//         const userFormData = Object.fromEntries(formdata)
//         console.log(userFormData)

//         switchDisplay(popupAcceptSec, popup2Content)
//     })
// })

// third popup

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

            switchDisplay(popupAcceptThrd, popup3Content)
        })
    })
}


