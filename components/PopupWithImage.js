export default class Popup {
  constructor({
    popupSelector,
    imageSelector = null,
    titleSelector = null,
  }) {
    this._popup = document.querySelector(popupSelector);

    // Opcionales
    this._image = imageSelector
      ? this._popup.querySelector(imageSelector)
      : null;

    this._title = titleSelector
      ? this._popup.querySelector(titleSelector)
      : null;

    this.open = this.open.bind(this);
  }

  open(data = {}) {
    // Si existe imagen, la configura
    if (this._image && data.link) {
      this._image.src = data.link;
      this._image.alt = data.name;
    }

    // Si existe título, lo configura
    if (this._title && data.name) {
      this._title.textContent = data.name;
    }

    this._popup.classList.add("popup_opened");

    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");

    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._popup
      .querySelector(".popup__btn-close")
      .addEventListener("click", () => {
        this.close();
      });

    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });
  }
}