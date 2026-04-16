import Card from "../components/Card";
import projects from "../components/InitialArray";
import Popup from "../components/Popup";
import PopupWithImage from "../components/PopupWithImage";
import section from "../components/section";
import contactData from "../components/ContactArray";
import InitialArray from "../components/InitialArray";

const container = document.querySelector('.main-photo_container');
const mainNav = document.querySelector('.main-nav');

container.addEventListener('mouseenter', () => {
  mainNav.classList.add('main-nav_hover');
});

container.addEventListener('mouseleave', () => {
  mainNav.classList.remove('main-nav_hover');
});
const mainNavLinks = document.querySelectorAll('.main-nav-link');
const section=document.querySelectorAll('.section');
mainNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      section.forEach(sec => sec.classList.remove('active'));
      const targetSection = document.querySelector(e.currentTarget.getAttribute('href'));
      targetSection.classList.add('active');
    });
});
const backTemplate = document.querySelector('#back-to-top-template');
section.forEach(sec => {
    if (sec.id === 'introduction') return;
    const backButton = backTemplate.content.querySelector('a').cloneNode(true);
    sec.appendChild(backButton);
    backButton.addEventListener('click', (e) => {
        e.preventDefault();
        section.forEach(s => s.classList.remove('active'));
        document.querySelector('#introduction').classList.add('active');
    })
});
