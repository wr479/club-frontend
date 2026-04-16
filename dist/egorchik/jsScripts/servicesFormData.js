const orderForm = document.forms[0];
const questionForm = document.forms[1];

function logData(form) {
    const formdata = new FormData(form);
    const userData = Object.fromEntries(formdata);
    console.log(userData);
}

orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    logData(orderForm)
})

questionForm.addEventListener('submit', (event) => {
    event.preventDefault();

    logData(questionForm)
})