import sectionsConfig  from "../config/sectionsConfig.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/section.js";

const container = document.querySelector('.main-photo_container');
const mainNav = document.querySelector('.main-nav');
const backTemplate = document.querySelector('#back-to-top-template');
function handlerImageClick(name, link) {
  popupImage.open(name, link);
}
container.addEventListener('mouseenter', () => {
  mainNav.classList.add('main-nav_hover');
});

container.addEventListener('mouseleave', () => {
  mainNav.classList.remove('main-nav_hover');
});
const mainNavLinks = document.querySelectorAll('.main-nav-link');
const sectionWrapper = document.querySelector('.dynamic-section');
const sectionContainer = document.querySelector('.section__container');
const section = document.querySelector('.section');
const sectionTitleTemplate = document.querySelector('#section-title-template');
const sectionInstance = new Section({
  renderer: (item) => item
}, sectionContainer);

mainNavLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    section.classList.remove('active');
    const sectionType = e.currentTarget.dataset.section;
    const titleElement = sectionTitleTemplate.content.firstElementChild.cloneNode(true);
    titleElement.textContent = sectionsConfig[sectionType].title;
    sectionWrapper.prepend(titleElement);
    const config = sectionsConfig[sectionType];
    sectionWrapper.className = 'dynamic-section';
    sectionWrapper.classList.add(`section-${sectionType}`);
    const renderer = (item) => {
      const card = new config.CardClass
      (item,
        config.templateSelector,
       config.handlerImageClick,
      )

      return card.generateCard();
    }
    sectionInstance.setRenderer(renderer);
    sectionInstance.clear();
    sectionInstance.renderItems(config.data);

    // Manejo del botón de volver (único)
    const existingBackButton = sectionWrapper.querySelector('.back-button');
    if (existingBackButton) {
      existingBackButton.remove();
    }

    if (sectionType !== 'introduction') {
      const backButton = backTemplate.content.firstElementChild.cloneNode(true);
      backButton.classList.add('back-button');

      backButton.addEventListener('click', (e) => {
        e.preventDefault();
        section.classList.add('active');
        sectionWrapper.className = 'dynamic-section';
        sectionWrapper.classList.remove(`section-${sectionType}`);
      });

      sectionWrapper.append(backButton);
    }
  });
});
