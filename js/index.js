import {popupPhotoBrowsingEl, popupPhotoBrowsingImageEl, popupPhotoBrowsingCaptionEl, initialCards} from './utils.js'; 
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
const defaultFormSelectors = {
    inputSelector: '.popup__input-item',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_blocked'
  };
  /*создаем классы для валидации форм*/
const profileFormValidation = new FormValidator(defaultFormSelectors,popupEditProfileFormEl);
const photoFormValidation = new FormValidator(defaultFormSelectors,popupAddPhotoFormEl);
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
/*тут я не согласен с ревью, дело в том, что у попапов есть transition для visibility c делеем,
поэтому если сделать даблклик по кнопке, то в консоли появится ошибка говорящая о том что нет у нас элемента с классом popup_opened
(мне кажется что это лучше чем условные констукции в closePopup но можно и переделать функцию closePopup)*/
function disableCloseBtns(){
  popupCloseBtns.forEach(popupCloseBtn => {
    popupCloseBtn.setAttribute('disabled', '');
});
}
const openPopup = (popupEl) => {
  enableCloseBtns();
  enableEscClose(popupEl);
  popupEl.classList.add('popup_opened');
};
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
export {openPopup};