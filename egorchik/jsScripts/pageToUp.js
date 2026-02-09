const ToUpbtn = document.querySelector('#iconUp');
const upperPage = document.querySelector('#upperPage');

ToUpbtn.addEventListener( 'click', scrolltoUp , false );

function scrolltoUp() {
    upperPage.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });
};
