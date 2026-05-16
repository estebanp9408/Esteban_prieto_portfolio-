import sectionsConfig  from "../config/sectionsConfig.js";
import ProjectPopup from "../components/ProjectPopup.js";
import Section from "../components/section.js";

const projectPopup = new ProjectPopup({
  popupSelector: ".project-popup",
  imageSelector: ".project-popup-image",
  titleSelector: ".project-popup-title",
  subtitleSelector: ".project-popup-subtitle",
  descriptionSelector: ".project-popup-description",
  impactSelector: ".project-popup-impact-text",
  technologiesSelector: ".project-popup-technologies-list",
  liveSelector: ".project-popup-page",
  repoSelector: ".project-popup-repository",
});

projectPopup.setEventListeners();
const container = document.querySelector('.main-photo_container');
const mainNav = document.querySelector('.main-nav');
const backTemplate = document.querySelector('#back-to-top-template');
function handlerImageClick(data) {
  projectPopup.open(data);
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
    titleElement.classList.add('section-title');
    titleElement.textContent = sectionsConfig[sectionType].title;
    sectionWrapper.prepend(titleElement);
    const config = sectionsConfig[sectionType];
    sectionWrapper.className = 'dynamic-section';
    sectionWrapper.classList.add(`section-${sectionType}`);
    const renderer = (item) => {

      console.log("🚀 ~ index.js:38 ~ sectionInstance:", sectionInstance)
      //""
      //""
      //[]
      //[]

      const card = new config.CardClass(
        item,
        config.templateSelector,
        handlerImageClick,
      );

      return card.generateCard();
    }
    sectionInstance.setRenderer(renderer);
    sectionInstance.clear();
    sectionInstance.renderItems(config.data);

    // quitar clase anterior si existe
    sectionContainer.classList.remove('projects__container', 'contact__container',);

    // agregar clase de la sección actual
    sectionContainer.classList.add(config.gridClass);

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
        sectionInstance.clear();
        const dynamicTitle = sectionWrapper.querySelector('.section-title');
        if (dynamicTitle) {
          dynamicTitle.remove();
        }
        backButton.remove();
      });
      sectionWrapper.append(backButton);
    }
  });
});
