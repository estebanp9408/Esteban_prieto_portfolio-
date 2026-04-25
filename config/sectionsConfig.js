import { aboutData } from '../data/aboutData.js';
import { projectsData } from '../data/projectsData.js';

import { AboutCard } from '../components/AboutCard.js';
import { ProjectCard } from '../components/ProjectCard.js';
import { ContactCard } from '../components/ContactCard.js';

export const sectionsConfig = {
  about: {
    className: 'section-about',
    data: aboutData,
    CardClass: AboutCard
  },
  projects: {
    className: 'section-projects',
    data: projectsData,
    CardClass: ProjectCard
  },
  contact: {
    className: 'section-contact',
    data: contactData,
    CardClass: ContactCard
  }
};