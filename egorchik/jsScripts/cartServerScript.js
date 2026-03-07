const postBtn = document.querySelectorAll('.purchase-btn-in-btn-cont');

const priceOfItem = document.querySelector('.price-cont > h1');
const titleOfItem = document.querySelector('.accum-info > h1');
const emkostOfItem = document.querySelector('#emkost');

postBtn.forEach((el) => {
    el.addEventListener('click', (event) => {
        event.preventDefault();

        let obj = {
            name: titleOfItem.textContent,
            emkost: Number(emkostOfItem.getAttribute('data-val')),
            price: parseInt(priceOfItem.textContent),
        }

        navigator.sendBeacon('http://localhost:3000/cart', JSON.stringify(obj));

        fetch('http://localhost:3000/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj),
        })
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            console.log(json)
        })
    })
})








