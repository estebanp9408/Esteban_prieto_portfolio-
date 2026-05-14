export default class Section {
  constructor({ renderer }, containerElement) {
    this._renderer = renderer
    this._container = containerElement
  }

  _renderItem(item) {
    const node = this._renderer(item);

    if (node) {
      this._container.append(node);
    }
  }
  _normalizeItems(items) {
    if (!items) return [];

    if (Array.isArray(items)) {
      return items;
    }

    if (typeof items === 'object') {
      return Object.values(items);
    }

    return [];
  }
  addItem(element) {
    this._container.append(element)
  }
  clear() {
    this._container.innerHTML = '';
  }

  setRenderer(renderer) {
    this._renderer = renderer;
  }
  
  renderItems(items) {
    this.clear();

    this._items = items;

    const normalizedItems = this._normalizeItems(items);



    normalizedItems.forEach(item => {

      this._renderItem(item);
    });
  }

}