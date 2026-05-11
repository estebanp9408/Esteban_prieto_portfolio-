export default class ProjectPopup {
  constructor({
    popupSelector,
    imageSelector,
    titleSelector,
    subtitleSelector,
    descriptionSelector,
    impactSelector,
    technologiesSelector,
    liveSelector,
    repoSelector,
  }) {
    this._popup = document.querySelector(popupSelector);
    this._popupContent = this._popup.querySelector('.project-popup-content');
    this._image = this._popup.querySelector(imageSelector);
    this._title = this._popup.querySelector(titleSelector);
    this._subtitle = this._popup.querySelector(subtitleSelector);
    this._description = this._popup.querySelector(descriptionSelector);
    this._impact = this._popup.querySelector(impactSelector);
    this._technologies = this._popup.querySelector(technologiesSelector);
    this._live = this._popup.querySelector(liveSelector);
    this._repo = this._popup.querySelector(repoSelector);
  }

  close() {
    this._popup.classList.remove("project-popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._popup
      .querySelector(".project-popup-close")
      .addEventListener("click", () => {
        this.close();
      });
    this._popup.addEventListener("mousedown", (evt) => {
      const isOutsidePopup = !this._popupContent.contains(evt.target);

      if (isOutsidePopup) {
        this.close();
      }
    });
  }
  setData(data) {
  this._image.src = data.link;
  this._image.alt = data.title;
  this._title.textContent = data.title;
  this._subtitle.textContent = data.subtitle;
  this._renderDescription(data.description);
  this._impact.textContent = data.impact;
  this._renderTechnologies(data.technologies);

  this._live.href = data.live;
  this._repo.href = data.repo;
}

_renderDescription(items) {
  this._description.innerHTML = "";

  items.forEach((text) => {
    const li = document.createElement("li");

    li.textContent = text;

    this._description.append(li);
  });
}

_renderTechnologies(items) {
  this._technologies.innerHTML = "";

  items.forEach((technology) => {
    const li = document.createElement("li");

    li.textContent = technology;

    this._technologies.append(li);
  });
}

open(data) {
  if (data) {
    this.setData(data);
  }
  this._popup.classList.add("project-popup_opened");

  document.addEventListener("keydown", this._handleEscClose);
}
}
