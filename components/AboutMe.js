export default class AboutMe {
  constructor({ name, title, description, skills, languages }, templateSelector) {
    this._name = name;
    this._title = title;
    this._description = description;
    this._skills = skills;
    this._languages = languages;
    this._template = document.querySelector(templateSelector);
  }
  getTemplate() {
    const templateContent = this._template.content.firstElementChild.cloneNode(true);

    templateContent.querySelector('.about-me__title').textContent = this._title;
    templateContent.querySelector('.about-me__description').textContent = this._description;

    const skillsList = templateContent.querySelector('.about-me__skills-list');
    this._skills.forEach(skill => {
      const li = document.createElement('li');
      li.textContent = skill;
      skillsList.append(li);
    });

    const languagesList = templateContent.querySelector('.about-me__languages-list');
    this._languages.forEach(({ name, level }) => {
      const li = document.createElement('li');
      li.textContent = `${name} — ${level}`;
      languagesList.append(li);
    });

    return templateContent;
  }
  generateCard() {
    const cardElement = this.getTemplate();
    return cardElement;
  }
}