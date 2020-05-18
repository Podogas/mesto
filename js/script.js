const profileEditBtn = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const profileForm = document.querySelector('.popup__input-container');
const profileNameInput = profileForm.querySelector('.popup__input-item_el_name');
const profileJobInput = profileForm.querySelector('.popup__input-item_el_job');
const closePopupBtn = document.querySelector('.popup__close-btn');
const profileSubmitBtn = profileForm.querySelector('.popup__submit-btn');
/*элементы DOM*/


const profile = {
  name: document.querySelector('.profile__name'),
  job: document.querySelector('.profile__job')
}
/*это объект с информацией о пользователе.*/


function togglePopup() {
  popup.classList.toggle('popup_opened');
  if (popup.classList.contains('popup_opened')) {
   profileNameInput.value = profile.name.textContent;
   profileJobInput.value = profile.job.textContent; 
  } 
}      

function formSubmitHandler (evt) {
  evt.preventDefault();

 if  ((profileNameInput.value.trim().length > 0) && (profileJobInput.value.trim().length > 0)) {
        profile.name.textContent = profileNameInput.value;
        profile.job.textContent = profileJobInput.value;
        togglePopup();
      } else {
        alert("Пожалуйста заполните оба поля");
      }
/*добавил проверку на пустые значения, по какой то причине перестал работать required в поле ввода.
не понял кстати почему. Оформление ошибки конечно так себе(alert) , и классно было бы вынести это
в отдельную функцию определения пустой строки, но надо бы продолжить учиться,все таки новый спринт начался */ 
  } 

profileEditBtn.addEventListener('click', togglePopup);
closePopupBtn.addEventListener('click', togglePopup);
profileSubmitBtn.addEventListener('click', formSubmitHandler);
