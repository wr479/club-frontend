const plus = document.querySelector('#plusCount');
const minus = document.querySelector('#minusCount');
let valueOfButton = document.querySelector('#counter');
let counter = -3;
let plug = '00';

function plusMinus() {
    if (counter < 0) {
        valueOfButton.textContent = (counter = 0);
    }

    plus.addEventListener('click', () => { 
    counter++;
    valueOfButton.textContent = '0' + counter;
    }, false);

    minus.addEventListener('click', () => { 
    counter--;
    valueOfButton.textContent = '0' + counter;
    }, false);   
}

plusMinus();

// plus.addEventListener('click', () => { 
//     counter++;
//     valueOfButton.textContent = counter;
// }, false);
// minus.addEventListener('click', () => { 
//     counter--;
//     valueOfButton.textContent = counter;
// }, false);


