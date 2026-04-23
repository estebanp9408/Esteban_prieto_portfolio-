export default class ContactCard {
  constructor({ type, label, value, icon, link }) {
    this.type = type;
    this.label = label;
    this.value = value;
    this.icon = icon;
    this.link = link;
  }
  getTemplate() {
}
}