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
    const templateContent = (this._template).content.firstElementChild.cloneNode(true);
    console.log(templateContent);
    const titleElement = templateContent.querySelector('.about-me__title');
    const descriptionElement = templateContent.querySelector('.about-me__description');
    titleElement.textContent = this._title;
    descriptionElement.textContent = this._description;
    return templateContent;
  }
  generateCard() {
    const cardElement = this.getTemplate();
    return cardElement;
  }
}