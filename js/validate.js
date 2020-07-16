

function validityState(inputs, state) {
  const formBtn = inputs[2];
  const inputError1 = document.querySelector(`#${inputs[0].id}-err`);
  const inputError2 = document.querySelector(`#${inputs[1].id}-err`);
  if (!state) {
    formBtn.classList.add('popup__submit-btn_blocked');
    inputError1.textContent = inputs[0].validationMessage;
    inputError2.textContent = inputs[1].validationMessage;

  } else {
    formBtn.classList.remove('popup__submit-btn_blocked');
    inputError1.textContent = '';
    inputError2.textContent = '';
  }
}


function isValid(inputs){
  if (!inputs[0].validity.valid || !inputs[1].validity.valid) {
    validityState(inputs , false);
} else {
    validityState(inputs , true);
    return true;
}
}