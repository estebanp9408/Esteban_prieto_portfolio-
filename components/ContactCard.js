export default class ContactCard {
  constructor({ type, label, value, icon, link }, templateSelector) {
    this.type = type;
    this.label = label;
    this.value = value;
    this.icon = icon;
    this.link = link;
    this.templateSelector = templateSelector;
  }
  getTemplate() {
    const template = document.querySelector(this.templateSelector)
    return template.content.firstElementChild.cloneNode(true);
  }
  generateCard() {
    const cardElement = this.getTemplate();
    const iconElement = cardElement.querySelector('.contact-card-icon');
    const labelElement = cardElement.querySelector('.contact-card-label');
    const valueElement = cardElement.querySelector('.contact-card-value');

    if (iconElement) {
      iconElement.src = this.icon;
      iconElement.alt = `${this.type} icon`;
    } else {
      console.warn(`Icon element not found in template for ${this.type}`);
    }

    if (labelElement) {
      labelElement.textContent = this.label;
    } else {
      console.warn(`Label element not found in template for ${this.type}`);
    }

    if (valueElement) {
      valueElement.textContent = this.value;
    } else {
      console.warn(`Value element not found in template for ${this.type}`);
    }

    cardElement.addEventListener('click', () => {
      window.open(this.link, '_blank');
    });

    return cardElement;
}
}