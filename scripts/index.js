import sectionsConfig from "../config/sectionsConfig.js";
import ProjectPopup from "../components/ProjectPopup.js";
import Section from "../components/section.js";
import { initResponsive, MobileMenu } from "./responsive.js";

// ============================================================
// 1. INICIALIZACIÓN DE RESPONSIVE
// ============================================================
initResponsive();

// ============================================================
// 2. CONFIGURACIÓN INICIAL DE COMPONENTES
// ============================================================
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
const mainNavLinks = document.querySelectorAll('.main-nav-link');
const sectionWrapper = document.querySelector('.dynamic-section');
const sectionContainer = document.querySelector('.section__container');
const section = document.querySelector('.section');
const sectionTitleTemplate = document.querySelector('#section-title-template');

const sectionInstance = new Section(
  { renderer: (item) => item },
  sectionContainer
);

// ============================================================
// 3. HANDLERS Y FUNCIONES AUXILIARES
// ============================================================

/**
 * Maneja click en imágenes de proyectos
 */
function handlerImageClick(data) {
  projectPopup.open(data);
}

/**
 * Configura eventos del contenedor principal (desktop)
 */
function setupDesktopEvents() {
  container.addEventListener('mouseenter', () => {
    mainNav.classList.add('main-nav_hover');
  });

  container.addEventListener('mouseleave', () => {
    mainNav.classList.remove('main-nav_hover');
  });
}

/**
 * Configura eventos de navegación
 */
function setupNavigationEvents() {
  mainNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      section.classList.remove('active');
      MobileMenu.close(); // Cerrar menú móvil si está abierto

      const sectionType = e.currentTarget.dataset.section;
      const titleElement = sectionTitleTemplate.content.firstElementChild.cloneNode(true);
      titleElement.classList.add('section-title');
      titleElement.textContent = sectionsConfig[sectionType].title;
      sectionWrapper.prepend(titleElement);

      const config = sectionsConfig[sectionType];
      sectionWrapper.className = 'dynamic-section';
      sectionWrapper.classList.add(`section-${sectionType}`);

      const renderer = (item) => {
        const card = new config.CardClass(
          item,
          config.templateSelector,
          handlerImageClick,
        );
        return card.generateCard();
      };

      sectionInstance.setRenderer(renderer);
      sectionInstance.clear();
      sectionInstance.renderItems(config.data);

      // Actualizar clases del contenedor
      sectionContainer.classList.remove('projects__container', 'contact__container');
      sectionContainer.classList.add(config.gridClass);

      // Remover botón de volver anterior si existe
      const existingBackButton = sectionWrapper.querySelector('.back-button');
      if (existingBackButton) {
        existingBackButton.remove();
      }

      // Agregar botón de volver si no es introducción
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
}

// ============================================================
// 4. INICIALIZACIÓN
// ============================================================
setupDesktopEvents();
setupNavigationEvents();
