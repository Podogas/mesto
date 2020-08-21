export default class FormValidator {
  constructor(formSettings, formEl){
    this.formSettings = formSettings;
    this.formEl = formEl;
    this.inputList = Array.from(formEl.querySelectorAll(formSettings.inputSelector));
    this.popupSubmitBtn = formEl.querySelector(formSettings.submitButtonSelector);
  };
  refreshValidation(){
    this._toggleBtnState();
    this.inputList.forEach(inputEl =>{
      const errElement = this.formEl.querySelector(`#${inputEl.id}-err`);
      errElement.textContent = null;  
    });
  };
  _hasInvalidInput(){
    return this.inputList.some(inputEl => {
      return !inputEl.validity.valid;
    });
  };
  _toggleBtnState(){
    if(this._hasInvalidInput()){
      this.popupSubmitBtn.classList.add(this.formSettings.inactiveButtonClass);
      this.popupSubmitBtn.setAttribute('disabled', '');
    } else {
      this.popupSubmitBtn.classList.remove(this.formSettings.inactiveButtonClass);
      this.popupSubmitBtn.removeAttribute('disabled');
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
    this.inputList.forEach(inputEl =>{
       const errElement = this.formEl.querySelector(`#${inputEl.id}-err`);
      this._setEventListeners(inputEl, errElement);
    });
  };
};