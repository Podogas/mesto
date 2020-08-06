const hasInvalidInput = (inputList) =>{
  const result = inputList.some(inputEl => {
    return !inputEl.validity.valid;
  })
  return result;
};
const toggleBtnState = (formSettings, inputList , popupSubmitBtn) => {
  if(hasInvalidInput(inputList)){
    popupSubmitBtn.classList.add(formSettings.inactiveButtonClass);
    popupSubmitBtn.setAttribute('disabled', '');
  } else {
    popupSubmitBtn.classList.remove(formSettings.inactiveButtonClass);
    popupSubmitBtn.removeAttribute('disabled');
  }
};
function resetInputErr(errElement)  {
  errElement.textContent = '';
}
function  showInputErr(form, inputEl, errElement)  {
  /*вписываем в него текст ошибки*/
  errElement.textContent = inputEl.validationMessage;
}
function isValid(formSettings, form, inputEl, inputList, popupSubmitBtn, errElement)  {
  showInputErr(form, inputEl, errElement);
  toggleBtnState(formSettings, inputList, popupSubmitBtn);
};

function enableValidation(formSettings)  {
  const form = document.querySelector(formSettings.formSelector);
  const inputs = form.querySelectorAll(formSettings.inputSelector);
  const inputList = Array.from(inputs);
  const popupSubmitBtn = form.querySelector(formSettings.submitButtonSelector);
  toggleBtnState(formSettings, inputList, popupSubmitBtn);
  inputList.forEach(inputEl =>{
    /*находим спан с ошибкой*/
    const errElement = form.querySelector(`#${inputEl.id}-err`);
    resetInputErr(errElement);
    inputEl.addEventListener('input', () => {
      isValid(formSettings, form, inputEl, inputList, popupSubmitBtn, errElement);
    });
  });
};