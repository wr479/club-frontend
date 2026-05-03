const currentForm = document.forms[0];
console.log(currentForm)

currentForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formdata = new FormData(currentForm);
    const userData = Object.fromEntries(formdata);
    console.log(userData);
})