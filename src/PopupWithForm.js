import Popup from './Popup.js';
export default class PopupWithForm extends Popup{
  constructor(popupSelector, {formSubmitHandler}){
    super(popupSelector);
    this.popupFormEl = this.popup.querySelector('.popup__input-container');
    this.formSubmitHandler = formSubmitHandler;
    this.submitBtn = this.popup.querySelector('.popup__submit-btn');
  }
  setEventListeners(){
    this.closeBtn.addEventListener('click' , this.close);
    this.popup.addEventListener('click' ,  this._handleOverlayClose);
    document.addEventListener('keydown' , this._handleEscClose);
/*   к сожалению здесь я застрал очень на долго и так и не нашел решения проблемы,
     в случае если указывать типом submit, то evt.preventDefault не работает */
    this.submitBtn.addEventListener('click' ,this.formSubmitHandler); 
  }
  _removeEventListeners(){ 
    this.closeBtn.removeEventListener('click' ,this.close);
    this.popup.removeEventListener('click' ,  this._handleOverlayClose); 
    document.removeEventListener('keydown' , this._handleEscClose);
    this.submitBtn.removeEventListener('click' ,this.formSubmitHandler); 
  }
  
  close(){
    this.popup.classList.remove('popup_opened');
    this._removeEventListeners();
    this.popupFormEl.reset();
  }
/*  мне пришлось сделать этот метод публичным, так как если отдавать его как колбек 
  внутри слушателя функции this.formSubmitHandler то у меня не получается удалить слушатель события
  мне кажется удаление слушателей вообще краеугольный камень в этой работе*/
  getInputValues(){
    this._inputList = this.popupFormEl.querySelectorAll('.popup__input-item');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
}