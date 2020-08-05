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
function resetInputErr(form, inputEl, errElement)  {
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

/*formSettings это массив с атрибутами и настройками элементов формы*/
function enableValidation(formSettings)  {
  const form = document.querySelector(formSettings.formSelector);
  const inputs = form.querySelectorAll(formSettings.inputSelector);
  const popupSubmitBtn = form.querySelector(formSettings.submitButtonSelector);
  /*добавляем слушатели с помощью переданной функции в объекте с настройками формы,
  для того что бы не прописывать при каждом добавлении нового попапа слушателей,
  так же сначала удаляем эти слушатели, что бы они не перезаписывались при каждом вызове
  enableValidation (если они конечно слушатели с одинаковыми аргументами могут перезаписываться, не нагуглил)*/
  popupSubmitBtn.removeEventListener('click', formSettings.submitButtonAction);
  popupSubmitBtn.addEventListener('click', formSettings.submitButtonAction);
  /*просто переделываем псевдомассив в массив, не знаю зачем)*/
  const inputList = Array.from(inputs);
  toggleBtnState(formSettings, inputList, popupSubmitBtn);
  inputList.forEach(inputEl =>{
    /*находим спан с ошибкой*/
    const errElement = form.querySelector(`#${inputEl.id}-err`);
    resetInputErr(form, inputEl, errElement);
    inputEl.addEventListener('input', () => {
      isValid(formSettings, form, inputEl, inputList, popupSubmitBtn, errElement);
    });
  });
};