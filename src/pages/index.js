import css from './index.css';
import {initialCards} from '../utils/utils.js'; 
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
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
const profileUserInfo = new UserInfo(profileNameEl, profileJobEl);
/*создаем классы для валидации форм*/
const profileFormValidation = new FormValidator(defaultFormSelectors,popupEditProfileFormEl);
const photoFormValidation = new FormValidator(defaultFormSelectors,popupAddPhotoFormEl);
/*вызываем валидацию*/
profileFormValidation.enableValidation();
photoFormValidation.enableValidation();
/*создаем класс для режима просмотра фото*/
const popupPhotoBrowsing = new PopupWithImage('.popup__photo-browsing');
/*добавляем обработчики*/
popupPhotoBrowsing.setEventListeners();
/*создаем класс для формы профиля*/
const popupEditProfile = new PopupWithForm('.popup_edit-profile',
  {
    formSubmitHandler: (inputValue) => {
      profileUserInfo.setUserInfo(inputValue);
      popupEditProfile.close();}
  },
);
/*добавляем обработчики*/
popupEditProfile.setEventListeners();

/*инициализируем класс для добавления карточек на страницу*/
const cardsContainer = new Section({
 /* вот тут при инициализации items и этими данными потом и оперирует cardsContainer.renderItems()
 положить сюда переменную через let у меня тоже не вышло*/
    items: initialCards,
    renderer: (cardItem) => {
      const newCard = createNewCard(cardItem);
      const newCardEl = newCard.createCardElement();
      cardsContainer.addItem(newCardEl);} 
    },
    '.elements'
    );
cardsContainer.renderItems();

/*создаем класс для формы добавления новой фотокарточки*/
const popupAddPhoto = new PopupWithForm('.popup_add-photo',{
    formSubmitHandler: (inputValue) => {
    const formatedData = {
      name: inputValue.photoName,
      link: inputValue.photoUrl,
    }
    cardsContainer.renderSingleItem(formatedData);
    popupAddPhoto.close();
    }
  },
);
/*добавляем обработчики*/
popupAddPhoto.setEventListeners();
/*функция создания карточки*/
function createNewCard(cardItem){ 
  const bufferedCard = new Card(cardItem,'#photo-card',{
  handleCardClick: () => {
    popupPhotoBrowsing.open(cardItem.link, cardItem.name);
  }
});
  return bufferedCard;
};
function editProfile() {
  const profileInfo = profileUserInfo.getUserInfo();
    profileNameInputEl.value = profileInfo.profileName;
    profileJobInputEl.value = profileInfo.profileJob;
    profileFormValidation.refreshValidation();
    popupEditProfile.open();
};
function addPhoto() {
  photoFormValidation.refreshValidation();
  popupAddPhoto.open();
};

profileEditBtn.addEventListener('click', editProfile);
profileAddBtn.addEventListener('click', addPhoto);

