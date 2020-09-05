export default class FormValidator {
  constructor(formSettings, formEl){
    this._formSettings = formSettings;
    this._formEl = formEl;
    this._inputList = Array.from(this._formEl.querySelectorAll(this._formSettings.inputSelector));
    this._popupSubmitBtn = this._formEl.querySelector(this._formSettings.submitButtonSelector);
  };
  refreshValidation(){
    this._toggleBtnState();
    this._inputList.forEach(inputEl =>{
      const errElement = this._formEl.querySelector(`#${inputEl.id}-err`);
      errElement.textContent = null;  
    });
  };
  _hasInvalidInput(){
    return this._inputList.some(inputEl => {
      return !inputEl.validity.valid;
    });
  };
  _toggleBtnState(){
    if(this._hasInvalidInput()){
      this._popupSubmitBtn.classList.add(this._formSettings.inactiveButtonClass);
      this._popupSubmitBtn.setAttribute('disabled', '');
    } else {
      this._popupSubmitBtn.classList.remove(this._formSettings.inactiveButtonClass);
      this._popupSubmitBtn.removeAttribute('disabled');
    };
  };
  _showInputErr(inputEl, errElement)  {
    errElement.textContent = inputEl.validationMessage;
  };
  _isValid( inputEl, errElement)  {
   this._showInputErr(inputEl, errElement);
    this._toggleBtnState();
  };
  _setEventListeners(inputEl, errElement){
    inputEl.addEventListener('input', () => {
      this._isValid(inputEl, errElement);
    });
  };
  enableValidation(){
    this._inputList.forEach(inputEl =>{
       const errElement = this._formEl.querySelector(`#${inputEl.id}-err`);
      this._setEventListeners(inputEl, errElement);
    });
  };
};