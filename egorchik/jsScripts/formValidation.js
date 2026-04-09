const currentForm = document.querySelector('.oformlenie-inputs-cont > form');
console.log(currentForm)

const nameInputEl = document.querySelector('[data-name-input]');
const phoneInputEl = document.querySelector('[data-phone-input]');
const mailInputEl = document.querySelector('[data-mail-input]');

function removeErr(divEl, input) {
    input.style.border = "4px solid black";
    let errorEl = divEl.nextSibling
    if (errorEl === null) {
        return
    } else {
        errorEl.remove()
    }
}

const nameInput = document.querySelector('.name-input');

nameInput.addEventListener('blur', () => {
    removeErr(nameInputEl, nameInput);

    if (nameInput.value.length < 3 || nameInput.value === "") {
        nameInput.style.border = "4px solid rgba(255, 0, 0, 1)";
        nameInputEl.insertAdjacentHTML('afterend', '<p class="error-message">Заполните поле</p>')
    }
})

const phoneInput = document.querySelector('.phone-input');

phoneInput.addEventListener('blur', () => {
    removeErr(phoneInputEl, phoneInput);

    if (phoneInput.value.length < 11 || phoneInput.value === "") {
        phoneInput.style.border = "4px solid rgba(255, 0, 0, 1)";
        phoneInputEl.insertAdjacentHTML('afterend', '<p class="error-message">Заполните поле</p>')
    }
})

const mailInput = document.querySelector('.mail-input');

mailInput.addEventListener('blur', () => {
    removeErr(mailInputEl, mailInput);

    if (mailInput.value === '') {
        return 
    } else if (!mailInput.value.includes("@")) {
        mailInput.style.border = "4px solid rgba(255, 0, 0, 1)";
        mailInputEl.insertAdjacentHTML('afterend', '<p class="error-message">Неверный формат</p>')
    }
})

currentForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(currentForm)
    const userData = Object.fromEntries(formData)

    fetch('http://localhost:3000/users', {
        method: "POST", 
        headers: {
                'Content-Type': 'application/json'
                },
        body: JSON.stringify(userData)
    })
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        console.log(json)
    })
})