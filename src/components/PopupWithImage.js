import Popup from './Popup.js';
import {popupPhotoBrowsingEl, popupPhotoBrowsingImageEl, popupPhotoBrowsingCaptionEl} from '../utils/constants.js'; 
export default class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector);
  }
  _resetPopup(){
    popupPhotoBrowsingCaptionEl.textContent = '';
    popupPhotoBrowsingImageEl.src = '';
  }
  open(src, caption){
    this._resetPopup();
    popupPhotoBrowsingCaptionEl.textContent = caption;
    popupPhotoBrowsingImageEl.src = src;
    super.open();
  }
}