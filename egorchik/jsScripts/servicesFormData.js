const orderForm = document.forms[0];
const questionForm = document.forms[1];

orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formdata = new FormData(orderForm);
    const userData = Object.fromEntries(formdata);
    console.log(userData);
})

questionForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formdata = new FormData(questionForm);
    const userData = Object.fromEntries(formdata);
    console.log(userData);
})