const plus = document.querySelector('#plusCount');
const minus = document.querySelector('#minusCount');
let valueOfButton = document.querySelector('#counter');
let counter = 0;
let plug = '00';

function plusMinus() {
    plus.addEventListener('click', () => { 
    counter++;
    valueOfButton.textContent = counter;
    }, false);

    minus.addEventListener('click', () => {
        if (counter > 0) {
            counter--;
            valueOfButton.textContent = counter;
        } 
    }, false);   
}

plusMinus();

const addBtn = document.querySelector('.choosen-bucket-btn-cont');
const priceOfItem = document.querySelector('.price-cont > h1');
const titleOfItem = 'MAGNUM 60Ah';
const emkostOfItem = document.querySelector('#emkost');
const quantityOfItem = valueOfButton;
addBtn.addEventListener('click', (event) => {
    event.preventDefault()

    let obj = {
        name: titleOfItem,
        emkost: Number(emkostOfItem.getAttribute('data-val')),
        price: parseInt(priceOfItem.textContent) * Number(quantityOfItem.textContent),
        quantity: Number(quantityOfItem.textContent),
    }

    fetch('/api/cart', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj),
    }).then((response) => {
        return response.json()
    }).then((json) => {
        console.log(json)
    })
})

// plus.addEventListener('click', () => { 
//     counter++;
//     valueOfButton.textContent = counter;
// }, false);
// minus.addEventListener('click', () => { 
//     counter--;
//     valueOfButton.textContent = counter;
// }, false);


