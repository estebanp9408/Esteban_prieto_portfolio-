import Card from "../components/Card.js";
import projects from "../components/InitialArray.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/section.js";
import contactData from "../components/ContactArray.js";
import aboutData from "../components/ProfileData.js";
import AboutME from "../components/AboutMe.js";
import ContactCard from "../components/ContactCard.js";

const container = document.querySelector('.main-photo_container');
const mainNav = document.querySelector('.main-nav');

container.addEventListener('mouseenter', () => {
  mainNav.classList.add('main-nav_hover');
});

container.addEventListener('mouseleave', () => {
  mainNav.classList.remove('main-nav_hover');
});
const mainNavLinks = document.querySelectorAll('.main-nav-link');
const sections=document.querySelectorAll('.section');
mainNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      sections.forEach(sec => sec.classList.remove('active'));
      const targetSection = document.querySelector(e.currentTarget.getAttribute('href'));
      targetSection.classList.add('active');
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
