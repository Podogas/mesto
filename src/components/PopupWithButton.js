import Popup from './Popup.js';
export default class PopupWithButton extends Popup{
  constructor(popupSelector, {formSubmitHandler, }){
    super(popupSelector);
    this._popupFormEl = this._popup.querySelector('.popup__input-container');
    this._formSubmitHandler = formSubmitHandler;
    this._submitBtn = this._popup.querySelector('.popup__submit-btn');
    this._cardTodeleteData = {};
    this._cardTodeleteClass = {};
  }
  setEventListeners(){
    super.setEventListeners();
    this._popupFormEl.addEventListener('submit' ,(evt) => {
      evt.preventDefault();
      this._formSubmitHandler(this._cardTodeleteData, this._cardTodeleteClass);
  }); 
  }
  handleCardToDelete(cardData, cardClass){
    this._cardTodeleteData = cardData;
    this._cardTodeleteClass = cardClass;
  }
}