const hasInvalidInput = (inputList) =>{
  const result = inputList.some(inputEl => {
    return !inputEl.validity.valid;
  })
  return result
};
const toggleBtnState = (inputList , popupSubmitBtn) => {
  if(hasInvalidInput(inputList)){
    popupSubmitBtn.classList.add('popup__submit-btn_blocked');
    popupSubmitBtn.removeEventListener('click', submitPopupForm);
  } else {
    popupSubmitBtn.classList.remove('popup__submit-btn_blocked');
    popupSubmitBtn.addEventListener('click', submitPopupForm);
  }
};

function  showInputErr(inputEl)  {
  /*находим спан с ошибкой*/
  const errElement = popupForm.querySelector(`#${inputEl.id}-err`);
  /*вписываем в него текст ошибки*/
  errElement.textContent = inputEl.validationMessage;
}
function isValid(inputEl)  {
  showInputErr(inputEl);


};
function setValidationAttr(formElements , formSettings)  {
    /*для каждого элемента формы...*/
  formElements.forEach( element =>{
    const indexOfElement = formElements.indexOf(element);
    const elementAttrs = formSettings[indexOfElement]; 
 /*атрибуты валидации*/
    if(elementAttrs.requiredAttr){
      element.required = 'required';
    };
    if(elementAttrs.minlengthAttr !== undefined){
      element.setAttribute('minlength',elementAttrs.minlengthAttr);
    };
    if(elementAttrs.maxlengthAttr !== undefined){
      element.setAttribute('maxlength',elementAttrs.maxlengthAttr);
    }; 
  });
};
/*formSettings это массив с атрибутами и настройками элементов формы*/
function enableValidation(formElements , formSettings , popupSubmitBtn)  {
  console.log(formSettings);
  setValidationAttr(formElements , formSettings);
  const inputList = Array.from(popupForm.getElementsByTagName('input'));
  toggleBtnState(inputList, popupSubmitBtn);
  inputList.forEach(inputEl =>{
    inputEl.addEventListener('input', () => {
      isValid(inputEl);
      toggleBtnState(inputList , popupSubmitBtn);
    });
  });
};