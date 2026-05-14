export default class Card {
  constructor(data, templateSelector, handlerImageClick = null) {
    this._data = data;
    this._title = data.title;
    this._subtitle = data.subtitle;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handlerImageClick;
  }
  _getTemplate() {
    console.log( (this._templateSelector));
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".projects-card__card")
      .cloneNode(true);
    return cardElement;
  }
_setEventListeners() {
  if (!this._handleCardClick) return;
  this._image.addEventListener("click", () => {
    this._handleCardClick(this._data);
  });
}
  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".projects-card__card-photo");
    this._text = this._element.querySelector(".projects-card__card-title");
    this._subtitleEl = this._element.querySelector(".projects-card__card-subtitle");
    this._image.alt = this._title;
    this._image.src = this._link;
    this._text.textContent = this._title;
    if (this._subtitleEl) {
      this._subtitleEl.textContent = this._subtitle;
    }
    this._setEventListeners();
    return this._element;
  }
}
