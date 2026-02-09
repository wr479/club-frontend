window.onbeforeunload = () => sessionStorage.setItem('scrollPos', window.scrollY);

window.onload = () => {
    const scrollPos = parseInt(sessionStorage.getItem('scrollPos')) || 0;
    window.scrollTo(0, scrollPos);
};