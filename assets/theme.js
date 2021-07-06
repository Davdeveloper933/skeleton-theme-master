const mobMenu = document.getElementById('mobileMenu');
const hamburger = document.getElementById('hamburger');
const expandedMenu = document.getElementById('expandedMenu');

mobMenu.addEventListener('click',() => {
    hamburger.classList.toggle('hide')
    expandedMenu.classList.toggle('hide')
})