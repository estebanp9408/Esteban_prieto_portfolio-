import Card from "../components/Card.js";
import projects from "../data/InitialArray.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/section.js";
import contactData from "../data/ContactArray.js";
import aboutData from "../data/ProfileData.js";
import AboutME from "../components/AboutMe.js";
import ContactCard from "../components/ContactCard.js";
function renderer(item) {
  const card = new Card(
    item,
    "#elements-template",
    handlerImageClick,
    handleDeleteClick,
    handleLikeClick,
    currentUserId
  );
  return card.generateCard();
}

const container = document.querySelector('.main-photo_container');
const mainNav = document.querySelector('.main-nav');

container.addEventListener('mouseenter', () => {
  mainNav.classList.add('main-nav_hover');
});

container.addEventListener('mouseleave', () => {
  mainNav.classList.remove('main-nav_hover');
});
const mainNavLinks = document.querySelectorAll('.main-nav-link');
const section = document.querySelector('.section');
mainNavLinks.forEach(link => {

    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionType= e.currentTarget.dataset.section;
      sectionType.classList.add('');
    });
});
const backTemplate = document.querySelector('#back-to-top-template');
sections.forEach(sec => {
    if (sec.id === 'introduction') return;
    const backButton = backTemplate.content.querySelector('a').cloneNode(true);
    sec.appendChild(backButton);
    backButton.addEventListener('click', (e) => {
        e.preventDefault();
        sections.forEach(s => s.classList.remove('active'));
        document.querySelector('#introduction').classList.add('active');
    })
});
