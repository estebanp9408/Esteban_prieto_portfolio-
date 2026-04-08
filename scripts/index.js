const mainPhoto = document.querySelector('.main-photo');
const mainNav = document.querySelector('.main-nav');
const mainNavHover = document.querySelector('.main-nav_hover');

mainPhoto.addEventListener('mouseover', () => {
    mainNav.classList.add('main-nav_hover');
});

mainPhoto.addEventListener('mouseout', () => {
    mainNav.classList.remove('main-nav_hover');
});