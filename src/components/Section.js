export default class Section {
  constructor({items, renderer}, containerSelector){ 
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderItems() {
    this._items.forEach(item => {
    this._renderer(item);
    })
  }
  /*для универсальности я бы назвал этот метод prepend а не addItem, но тут видимо это не потребуется*/
  addItem(element){
    this._container.prepend(element);
  }
}