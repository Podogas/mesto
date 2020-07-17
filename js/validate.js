const inputError1 = document.querySelector(`#${popupInput1.id}-err`);
const inputError2 = document.querySelector(`#${popupInput2.id}-err`);
/*обявляем ошибки именно в этом файле, так как они нигде кроме как тут не будут использоваться(скорее всего)*/

  function enableValidation(inputs) {
    if(inputs !== popupForm){
      inputError1.textContent = '';
      inputError2.textContent = '';
      popupInput1.classList.remove('popup__input-item_invalid')
      popupInput2.classList.remove('popup__input-item_invalid');
      if(document.activeElement=== popupInput1 || document.activeElement=== popupInput2){
        popupInput1.classList.add('popup__input-item_invalid');
        inputError1.textContent = popupInput1.validationMessage;
        if (popupInput1.validationMessage === ''){
          popupInput1.classList.remove('popup__input-item_invalid');
        }
        popupInput2.classList.add('popup__input-item_invalid');
        inputError2.textContent = popupInput2.validationMessage;
        if (popupInput2.validationMessage === ''){
          popupInput2.classList.remove('popup__input-item_invalid');
        }
      }   
    }
  }
  /*тут к сожалению получается так что классы добавляются
  при каждом изменении поля инпута, но к сожалению более изящного решения придуумать не удалось.*/

  function validityState(inputs, state) {
    if (!state) {
      popupSubmitButton.classList.add('popup__submit-btn_blocked');
      enableValidation(inputs)
    } else {
      popupSubmitButton.classList.remove('popup__submit-btn_blocked');
      popupInput1.classList.remove('popup__input-item_invalid');
      popupInput2.classList.remove('popup__input-item_invalid');
      inputError1.textContent = '';
      inputError2.textContent = '';
    }
  }

  function isValid(inputs){
    if (!popupInput1.validity.valid || !popupInput2.validity.valid) {
      validityState(inputs , false);
    } else {
      validityState(inputs , true);
      return true;
    }
  }
