export default class Section {
  constructor({ renderer }, containerElement) {
    this._renderer = renderer
    this._container = containerElement
  }
  renderItems(items){
    items.forEach((item) => {
     const card =this._renderer(item);
     this.addItem(card);
    });

  }
  addItem(element){
    this._container.append(element)
  }
  clear() {
    this._container.innerHTML = '';
  }

  setRenderer(renderer) {
    this._renderer = renderer;
  }
}