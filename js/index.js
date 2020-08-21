import {initialCards} from './utils.js'; 
import FormValidator from './FormValidator.js';
import Card from './Card.js';
  /*Элементы DOM*/
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileAddBtn = document.querySelector('.profile__add-button');
const profileNameEl = document.querySelector('.profile__name');
const profileJobEl = document.querySelector('.profile__job');
  /*Темплейт карточки с фото*/
const photoCard = document.querySelector('#photo-card').content;
  /*Элементы попапов*/
const popups = document.querySelectorAll('.popup');
const popupCloseBtns = document.querySelectorAll('.popup__close-btn');
  /*Элементы попапа просмотра фотографий*/
const popupPhotoBrowsingEl = document.querySelector('.popup__photo-browsing');
const popupPhotoBrowsingImageEl = popupPhotoBrowsingEl.querySelector('.popup__image-photo-browsing');
const popupPhotoBrowsingCaptionEl = popupPhotoBrowsingEl.querySelector('.popup__caption-photo-browsing');

  /*Элементы попапа редактирования профиля*/

const popupEditProfileFormEl = document.querySelector('.popup__input-container_edit-profile');
const popupEditProfileEl = document.querySelector('.popup_edit-profile');
const popupEditProfileHeadingEl = document.querySelector('.popup__heading_edit-profile');
const profileNameInputEl = document.querySelector('#profileNameInput');
const profileJobInputEl = document.querySelector('#profileJobInput');
  /*Элементы попапа добавления фотокарточки*/
const popupAddPhotoFormEl = document.querySelector('.popup__input-container_add-photo');
const popupAddPhotoEl = document.querySelector('.popup_add-photo');
const popupAddPhotoHeadingEl = document.querySelector('.popup__heading_add-photo');
const photoNameInputEl = document.querySelector('#photoNameInput'); 
const photoUrlInputEl = document.querySelector('#photoUrlInput');
  /*Контейнер для фотокарточек*/
const elementsContainerEl = document.querySelector('.elements');
  /*создаем классы для валидации форм*/
const profileFormValidation = new FormValidator(
  {
    inputSelector: '.popup__input-item',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_blocked'
  },
  popupEditProfileFormEl
  );
const photoFormValidation = new FormValidator(
  {
    inputSelector: '.popup__input-item',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_blocked'
  },
    popupAddPhotoFormEl
  );
/*вызываем валидацию*/
profileFormValidation.enableValidation();
photoFormValidation.enableValidation();

function formSubmitAddPhoto(evt) {
  evt.preventDefault();
  const data = { 
    name: photoNameInputEl.value,
    link: photoUrlInputEl.value 
  };
  const newCard =  new Card (data, '#photo-card');
  const newCardEl = newCard.createCardElement();
  elementsContainerEl.prepend(newCardEl);
  closePopup();
};
function disableEscClose(){
  document.removeEventListener('keydown' , escClose);
};
function disableCloseBtns(){
  popupCloseBtns.forEach(popupCloseBtn => {
    popupCloseBtn.setAttribute('disabled', '');
});
}
function closePopup(){
  document.querySelector('.popup_opened')
  .classList.remove('popup_opened');
  disableCloseBtns();
  disableEscClose();
};
function escClose(evt) {
  if(evt.key === 'Escape'){
    closePopup();
  };
};
function enableEscClose()  {
  document.addEventListener('keydown' , escClose);
};
function enableCloseBtns()  {
  popupCloseBtns.forEach(popupCloseBtn => {
    popupCloseBtn.removeAttribute('disabled');
});
}
const openPopup = (popupEl) => {
  enableCloseBtns();
  enableEscClose(popupEl);
  popupEl.classList.add('popup_opened');
};
function saveProfile() {
  profileNameEl.textContent = profileNameInputEl.value;
  profileJobEl.textContent = profileJobInputEl.value;
};
function formSubmitEditProfile(evt){
  evt.preventDefault();
  saveProfile();
  closePopup();
};
function editProfile() {
  profileNameInputEl.value = profileNameEl.textContent;
  profileJobInputEl.value = profileJobEl.textContent;
  profileFormValidation.refreshValidation();
  openPopup(popupEditProfileEl);
};
function addPhoto() {
  popupAddPhotoFormEl.reset();
  photoFormValidation.refreshValidation();
  openPopup(popupAddPhotoEl);
};

initialCards.forEach((initialCard) => {
  const newCard =  new Card (initialCard, '#photo-card');
  const newCardEl = newCard.createCardElement();
  elementsContainerEl.prepend(newCardEl);
});
/* Ниже обработчики событий*/
popupCloseBtns.forEach(popupCloseBtn => {
  popupCloseBtn.addEventListener('click' , closePopup)
});
popups.forEach(popup => {
  popup.addEventListener('click' , event =>{
    if (event.target.classList.contains('popup_opened')) {
      closePopup();
    };
  });
});
profileEditBtn.addEventListener('click', editProfile);
profileAddBtn.addEventListener('click', addPhoto);
popupEditProfileFormEl.addEventListener('submit' , formSubmitEditProfile);
popupAddPhotoFormEl.addEventListener('submit' , formSubmitAddPhoto);
export {popupPhotoBrowsingEl, popupPhotoBrowsingImageEl, popupPhotoBrowsingCaptionEl, openPopup};