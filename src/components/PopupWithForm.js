import Popup from './Popup.js';
export default class PopupWithForm extends Popup{
  constructor(popupSelector, {formSubmitHandler}){
    super(popupSelector);
    this._popupFormEl = this._popup.querySelector('.popup__input-container');
    this._formSubmitHandler = formSubmitHandler;
    this._submitBtn = this._popup.querySelector('.popup__submit-btn');
  }
  setEventListeners(){
    super.setEventListeners();
    this._popupFormEl.addEventListener('submit' ,(evt) => {
      evt.preventDefault();
      this._formSubmitHandler(this._getInputValues());
}); 
  }
  close(){
    super.close();
    this._popupFormEl.reset();
  }

  _getInputValues(){
    this._inputList = this._popupFormEl.querySelectorAll('.popup__input-item');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
}