const currentForm = document.querySelector('.oformlenie-inputs-cont > form');
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

    const idDetect = document.querySelectorAll('.shell');
        idDetect.forEach((el) => {
        const idForDelete = el.children[0].getAttribute('data-cart-id')
        fetch(`http://localhost:3000/api/admin/products/${idForDelete}`, {
            method: "DELETE",
            headers: {
            'Content-Type': 'application/json'
            },
        })
        .then((response => {
            if (response.ok) {
                console.log(`товар с айди ${idForDelete} удален в api успешно`)
            } else {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || 'Ошибка при удалении из api')
                })
            }
        }))
        .catch(er => console.error(er))

        try {
            localStorage.removeItem(`${idForDelete}`)
            location.reload()
            
            console.log(`удаление элемента с айди ${idForDelete} из localStorage успешно`)
        } catch (error) {
            console.log(`Ошибка при удалени из localStorage: ${error}`)
        }
    })


    const formData = new FormData(currentForm)
    const userData = Object.fromEntries(formData)

    console.log(userData)
})

