import Popup from './Popup.js';
import {popupPhotoBrowsingEl, popupPhotoBrowsingImageEl, popupPhotoBrowsingCaptionEl, initialCards} from './utils.js'; 
export default class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector);
  }
/*  добавил ресет, потому что без него картинка по какой то причине не успевала загрузиться в попап раньше
  чем он открывался, и можно было наблюдать неприятный эффект, когда отрывая картинку долю секунды
  в попапе была преведущая картинка, и только потом она менялась на ту на которой произошел клик*/
  _resetPopup(){
    popupPhotoBrowsingCaptionEl.textContent = '';
    popupPhotoBrowsingImageEl.src = '';
  }
  open(src, caption){
    this._resetPopup();
    popupPhotoBrowsingCaptionEl.textContent = caption;
    popupPhotoBrowsingImageEl.src = src;
    this.popup.classList.add('popup_opened');
  }
}