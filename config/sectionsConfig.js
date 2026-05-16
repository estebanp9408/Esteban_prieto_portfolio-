import  aboutData  from '../data/ProfileData.js';
import  projects  from '../data/InitialArray.js';
import  contactData  from '../data/ContactArray.js';
import  AboutMe  from '../components/AboutMe.js';
import Card from '../components/Card.js';
import  ContactCard  from '../components/ContactCard.js';

export const sectionsConfig = {

  about: {

    title: 'Sobre mí',
    className: 'section-about',
    data: aboutData,
    CardClass: AboutMe,
    templateSelector: "#about-me__template",

  },

  projects: {
    title: 'Proyectos',
    className: 'section-projects',
    data: projects,
    CardClass: Card,
    templateSelector: "#projects__card-template",
    handlerImageClick: (data) => {
      popupImage.open(data);
    },
    gridClass: "projects__container"
  },

  contact: {
    title: 'Contacto',
    className: 'section-contact',
    data: contactData,
    CardClass: ContactCard,
    templateSelector: ".contact__card-template",
    gridClass: "contact__container"
  }

};
export default sectionsConfig;