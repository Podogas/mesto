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
const popupPhotoBrowsingImageEl = popupPhotoBrowsingEl.querySelector('.popup__image_photo-browsing');
const popupPhotoBrowsingCaptionEl = popupPhotoBrowsingEl.querySelector('.popup__caption_photo-browsing');
  /*Элементы попапа редактирования профиля*/
const popupEditProfileEl = document.querySelector('.popup_edit-profile');
const popupEditProfileFormEl = document.querySelector('.popup__input-container_edit-profile');
const popupEditProfileHeadingEl = document.querySelector('.popup__heading_edit-profile');
const profileNameInputEl = document.querySelector('#profileNameInput');
const profileJobInputEl = document.querySelector('#profileJobInput');
  /*Элементы попапа добавления фотокарточки*/
const popupAddPhotoEl = document.querySelector('.popup_add-photo');
const popupAddPhotoFormEl = document.querySelector('.popup__input-container_add-photo');
const popupAddPhotoHeadingEl = document.querySelector('.popup__heading_add-photo');
const photoNameInputEl = document.querySelector('#photoNameInput'); 
const photoUrlInputEl = document.querySelector('#photoUrlInput');
  /*Контейнер для фотокарточек*/
const elementsContainerEl = document.querySelector('.elements');
  /*Селекторы элементов формы для функции валидации форм*/
const profileFormSettings = {
    formSelector: '.popup__input-container_edit-profile',
    inputSelector: '.popup__input-item',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_blocked'
  };
const photoFormSettings = {
    formSelector: '.popup__input-container_add-photo',
    inputSelector: '.popup__input-item',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_blocked'
  };
  /*Валидируем формы при загрузке страницы*/   
enableValidation(profileFormSettings);
enableValidation(photoFormSettings);

function disableEscClose(){
  document.removeEventListener('keydown' , escClose);
};
function closePopup(){
  openedPopup = document.querySelector('.popup_opened');
  openedPopup.classList.remove('popup_opened');
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
function openPopup(popupEl)  {
  popupEl.classList.add('popup_opened');
  enableEscClose(popupEl);
};
/*удаление фото*/
function deletePhoto(del){
  del.target.parentElement.remove();
};
function displayPhotoCard(bufferedCardEl) {
   /*добавляем разметку на страницу*/
  elementsContainerEl.prepend(bufferedCardEl);
};
function createPhotoCard(name, link) { 
  const bufferedCardEl = photoCard.cloneNode(true);
  const cardElement = {
    card: bufferedCardEl.querySelector('.element'),
    cardImage: bufferedCardEl.querySelector('.element__image'),
    cardCaption: bufferedCardEl.querySelector('.element__caption'),
    deleteCard: bufferedCardEl.querySelector('.element__trash-can'),
    likeCard: bufferedCardEl.querySelector('.element__like-button')
  };
  /*добавляем ссылку и название*/
  cardElement.cardCaption.textContent = name;
  cardElement.cardImage.setAttribute('style', `background-image: url(${link});`);
  /*обработчики событий*/
  cardElement.deleteCard.addEventListener('click', deletePhoto);
  /*поставить класс*/
  cardElement.likeCard.addEventListener('click', function(evt){
  evt.target.classList.toggle('element__like-button_liked');
  });
  /*добавляем обработчик для режима просмотра*/
  cardElement.cardImage.addEventListener('click', function(evt){
    const imageUrl = evt.target.style.backgroundImage.slice(5, -2);
    popupPhotoBrowsingImageEl.setAttribute('src', imageUrl);
    popupPhotoBrowsingCaptionEl.textContent = cardElement.cardCaption.textContent;
    openPopup(popupPhotoBrowsingEl);
  });
  return bufferedCardEl;
};
function formSubmitAddPhoto(evt) {
  evt.preventDefault();
  const card = createPhotoCard(photoNameInputEl.value, photoUrlInputEl.value);
  displayPhotoCard(card);
  closePopup();
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
  openPopup(popupEditProfileEl);
  resetPopupFormValidation(profileFormSettings);
};
function addPhoto() {
  popupAddPhotoFormEl.reset();
  openPopup(popupAddPhotoEl);
  resetPopupFormValidation(photoFormSettings);
};

initialCards.forEach((initialCard) => {
    const card = createPhotoCard(initialCard.name, initialCard.link);
    displayPhotoCard(card);
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

