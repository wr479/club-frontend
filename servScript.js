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
}); // с этой частью кода помогла нейронка

function triaglesFunc() {
        if (activeId === 'label1') {
            pic1.style.display = 'block';
            border1.style.backgroundImage = 'url(./allAssets/services/active-label.png)'; 
            pic2.style.display = 'none';
            border2.style.backgroundImage = 'url(./allAssets/services/passive-label.png)';
            pic3.style.display = 'none';
            border3.style.backgroundImage = 'url(./allAssets/services/passive-label.png)';
        } else if (activeId === 'label2') {
            pic1.style.display = 'none';
            border1.style.backgroundImage = 'url(./allAssets/services/passive-label.png)';
            pic2.style.display = 'block';
            border2.style.backgroundImage = 'url(./allAssets/services/active-label.png)';
            pic3.style.display = 'none';
            border3.style.backgroundImage = 'url(./allAssets/services/passive-label.png)';
        } else if (activeId === 'label3') {
            pic1.style.display = 'none';
            border1.style.backgroundImage = 'url(./allAssets/services/passive-label.png)';
            pic2.style.display = 'none';
            border2.style.backgroundImage = 'url(./allAssets/services/passive-label.png)';
            pic3.style.display = 'block';
            border3.style.backgroundImage = 'url(./allAssets/services/active-label.png)';
        };
}; // а тут логику сам писал ( видно потому, что не аккуратно )

triaglesFunc();

console.log(triagles)