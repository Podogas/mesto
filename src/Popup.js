export default class Popup{
  constructor(popupSelector){
    this.popup = document.querySelector(popupSelector);
    this.closeBtn = this.popup.querySelector('.popup__close-btn');
/*    эта строчка мне стоила очень больших мучений, 
    не совсем понимаю почему без присваивания метода переменной, removeEventListener не работал
    я же все равно ссылался на один и тот же объект. на метод через бинд то есть
    removeEventListener('click' , this.close.bind(this); не работал */
    this.close = this.close.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
  }
  open(){
    this.popup.classList.add('popup_opened');
  }
  close(){
    this.popup.classList.remove('popup_opened');
    this._removeEventListeners();
  }
  setEventListeners(){
    this.closeBtn.addEventListener('click' , this.close);
    this.popup.addEventListener('click' ,  this._handleOverlayClose);
    document.addEventListener('keydown' , this._handleEscClose); 
  }
  _removeEventListeners(){ 
    this.closeBtn.removeEventListener('click' ,this.close);
    this.popup.removeEventListener('click' ,  this._handleOverlayClose); 
    document.removeEventListener('keydown' , this._handleEscClose);
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