export default class Popup{
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
    this._closeBtn = this._popup.querySelector('.popup__close-btn');
    this.close = this.close.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
  }
  open(){
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown' , this._handleEscClose); 
  }
  close(){
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown' , this._handleEscClose); 
  }
  setEventListeners(){
    this._closeBtn.addEventListener('click' , this.close);
    this._popup.addEventListener('click' ,  this._handleOverlayClose);
  }
  _handleOverlayClose(evt){
    if (evt.target.classList.contains('popup_opened')) {
        this.close();
      };
  }
  _handleEscClose(evt){
    if(evt.key === 'Escape'){
      this.close();
    };
  }
}