let activeId = null;

const labels = document.querySelectorAll('.wrap-label');
const triagles = document.querySelectorAll('.triagle-with-pic');

const pic1 = document.querySelector('#triagle1');
const pic2 = document.querySelector('#triagle2');
const pic3 = document.querySelector('#triagle3');

const border1 = document.querySelector('#border1');
const border2 = document.querySelector('#border2');
const border3 = document.querySelector('#border3');


labels.forEach((label) => {
    label.addEventListener('click', () => {
        if (activeId === label.id) return;

        labels.forEach(i => i.classList.remove('active'));

        label.classList.add('active');

        activeId = label.id;
        triaglesFunc();
    });
});

const activeLabel = 'url(../allAssets/services/active-label.png)';
const passiveLabel = 'url(../allAssets/services/passive-label.png)';

function switchTrianglesStyle(state1, state2, state3) {
    pic1.style.display = state1;
    state1 === 'block' 
        ? border1.style.backgroundImage = activeLabel
        : border1.style.backgroundImage = passiveLabel

    pic2.style.display = state2;
    state2 === 'block' 
        ? border2.style.backgroundImage = activeLabel
        : border2.style.backgroundImage = passiveLabel

    pic3.style.display = state3;
    state3 === 'block' 
        ? border3.style.backgroundImage = activeLabel
        : border3.style.backgroundImage = passiveLabel
}

function triaglesFunc() {
        if (activeId === 'label1') {
            switchTrianglesStyle('block', 'none', 'none')
        } else if (activeId === 'label2') {
            switchTrianglesStyle('none', 'block', 'none')
        } else if (activeId === 'label3') {
            switchTrianglesStyle('none', 'none', 'block')
        };
};

triaglesFunc();