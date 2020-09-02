import css from './pages/index.css';
import {initialCards} from './utils.js'; 
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';
import Card from './Card.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
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
const ProfileUserInfo = new UserInfo(profileNameEl, profileJobEl);
/*создаем классы для валидации форм*/
const ProfileFormValidation = new FormValidator(defaultFormSelectors,popupEditProfileFormEl);
const PhotoFormValidation = new FormValidator(defaultFormSelectors,popupAddPhotoFormEl);
/*вызываем валидацию*/
ProfileFormValidation.enableValidation();
PhotoFormValidation.enableValidation();
 
const PopupEditProfile = new PopupWithForm('.popup_edit-profile',{
    formSubmitHandler: (evt) => {
      evt.preventDefault();
      ProfileUserInfo.setUserInfo(PopupEditProfile.getInputValues());
      PopupEditProfile.close();
    }
  },
);
const PopupAddPhoto = new PopupWithForm('.popup_add-photo',{
    formSubmitHandler: (evt) => {
      evt.preventDefault();
  const card = [
    { 
      name: photoNameInputEl.value,
      link: photoUrlInputEl.value, 
      liked: false
    },
  ];
const NewCardSection = new Section({
    items: card,
    renderer: (cardItem) => {
      const newCard = new Card(cardItem,'#photo-card',{
        handleCardClick: () => {
          popupPhotoBrowsing.open(cardItem.link, cardItem.name);
          popupPhotoBrowsing.setEventListeners();
        }
      });
      const newCardEl = newCard.createCardElement();
      NewCardSection.addItem(newCardEl);
      }, 
    },
    '.elements'
    );
    NewCardSection.renderItems();
    PopupAddPhoto.close();
    }
  },
);  
const popupPhotoBrowsing = new PopupWithImage('.popup__photo-browsing');
function editProfile() {
  const profileInfo = ProfileUserInfo.getUserInfo();
    profileNameInputEl.value = profileInfo.profileName;
    profileJobInputEl.value = profileInfo.profileJob;
  ProfileFormValidation.refreshValidation();
  PopupEditProfile.open();
  PopupEditProfile.setEventListeners();
};
function addPhoto() {
  PhotoFormValidation.refreshValidation();
  PopupAddPhoto.open();
  PopupAddPhoto.setEventListeners();
};

/*Инициализируем Section для initialCards*/
const InitialCardSection = new Section({
    items: initialCards,
    renderer: (cardItem) => {
      const newCard = new Card(cardItem,'#photo-card',{
        handleCardClick: () => {
          popupPhotoBrowsing.open(cardItem.link, cardItem.name);
          popupPhotoBrowsing.setEventListeners();
        }
      });
      const newCardEl = newCard.createCardElement();
      InitialCardSection.addItem(newCardEl);
      }, 
    },
    '.elements'
    );
  InitialCardSection.renderItems();

profileEditBtn.addEventListener('click', editProfile);
profileAddBtn.addEventListener('click', addPhoto);

