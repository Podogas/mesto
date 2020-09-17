import Popup from './Popup.js';
export default class PopupWithImage extends Popup{
  constructor(popupSelector, popupElements){
    super(popupSelector);
    this._popupElements = popupElements;
  }
  _resetPopup(){
    this._popupElements.popupPhotoBrowsingCaptionEl.textContent = '';
    this._popupElements.popupPhotoBrowsingImageEl.src = '';
  }
  open(src, caption){
    this._resetPopup();
    this._popupElements.popupPhotoBrowsingCaptionEl.textContent = caption;
    this._popupElements.popupPhotoBrowsingImageEl.src = src;
    super.open();
  }
}