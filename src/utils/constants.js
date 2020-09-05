  /*Элементы DOM*/
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileAddBtn = document.querySelector('.profile__add-button');
const profileNameEl = document.querySelector('.profile__name');
const profileJobEl = document.querySelector('.profile__job');
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
const defaultFormSelectors = {
    inputSelector: '.popup__input-item',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_blocked'
  };

export {
  profileEditBtn, profileAddBtn, profileNameEl, profileJobEl,
  popupEditProfileFormEl, popupEditProfileEl, popupEditProfileHeadingEl,
  profileNameInputEl, profileJobInputEl, popupAddPhotoFormEl, popupAddPhotoEl,
  popupAddPhotoHeadingEl, photoNameInputEl, photoUrlInputEl, defaultFormSelectors
};  