const searchbar = document.querySelector('#searchbar');
const searchbarOpener = document.querySelector('#searchbar-opener');
const searchbarCloser = document.querySelector('#searchbar-closer');

searchbarOpener.addEventListener('click', openSearch, false);
searchbarCloser.addEventListener('click', closeSearch, false);

function openSearch() {
    searchbar.style.display = 'flex';
};

function closeSearch() {
    searchbar.style.display = 'none';
};