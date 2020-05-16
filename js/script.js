const profileEditBtn = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const profileForm = document.querySelector('.popup__input-container');
const profileNameInput = profileForm.querySelector('.popup__input-item_el_name');
const profileJobInput = profileForm.querySelector('.popup__input-item_el_job');
const closePopupBtn = document.querySelector('.popup__close-btn');
const profileSubmitBtn = profileForm.querySelector('.popup__submit-btn');
/*элементы DOM*/


let profile = {
  name: document.querySelector('.profile__name'),
  job: document.querySelector('.profile__job')
}
/*это объект с информацией о пользователе*/


function togglePopup() {
  popup.classList.toggle('popup_opened');
  if (popup.classList.contains('popup_opened')) {
    closePopupBtn.addEventListener('click', togglePopup);
    profileEditBtn.removeEventListener('click', togglePopup);
    closePopupBtn.addEventListener('click', togglePopup);
    profileNameInput.setAttribute('value', profile.name.textContent);
    profileJobInput.setAttribute('value', profile.job.textContent);
  }
  /*условие нужно для того что бы удалять и добавлять EventListener*/ 
  else {
    profileEditBtn.addEventListener('click', togglePopup);
    closePopupBtn.removeEventListener('click', togglePopup);
  }
}      
/*Не получается решить проблему с текстовыми значениями в инпутах
суть следующая: я ввожу значение в поле, нажимаю закрыть, value остается как и был
но при повторном открытии введенный текст отсается на своем месте, 
не смог найти способов его заставить при нажатии принимать значение value*/

function formSubmitHandler (evt) {
    evt.preventDefault();
    profile.name.textContent = profileNameInput.value;
    profile.job.textContent = profileJobInput.value;
    togglePopup();
} 

profileEditBtn.addEventListener('click', togglePopup);

profileSubmitBtn.addEventListener('click', formSubmitHandler);
/*Как удалить этот EventListener я не придумал, сейчас получается что он всегда висит на странице насколько это критично?
И как обычно поступают в таких случаях, в интернетах есть те кто топят за удаление тк EventListener нагружает страницу,
 а есть те кто говорят что можно оставить*/