const currentForm = document.forms[0];
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