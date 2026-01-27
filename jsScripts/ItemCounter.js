const plus = document.querySelector('#plusCount');
const minus = document.querySelector('#minusCount');
let counter = 0;

plus.addEventListener('click', () => { 
    counter++;
    console.log(counter);
}, false);
minus.addEventListener('click', () => { 
    counter--;
    console.log(counter);
}, false);

