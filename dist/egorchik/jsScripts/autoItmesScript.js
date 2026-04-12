let frstPage = document.querySelectorAll('#first');
let frstPageBrightness = document.querySelectorAll('#first-hover');

frstPage.forEach((hvr, index) => {
  hvr.addEventListener('mouseenter', () => frstPageHover(hvr, frstPageBrightness[index]), false);
});

frstPageBrightness.forEach((brght, index) => {
  brght.addEventListener('mouseleave', () => frstPageUnhover(frstPage[index], brght), false);
});

function frstPageHover(_element, _brightnessElement) {
    _brightnessElement.style.display = 'flex';
    _element.style.filter = 'brightness(30%)';
};

function frstPageUnhover(_element, _brightnessElement) {
    _brightnessElement.style.display = 'none';
    _element.style.filter = '';
};