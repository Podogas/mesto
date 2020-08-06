/*дописываю все в панике*/

   /*элементы DOM*/
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileAddBtn = document.querySelector('.profile__add-button');
const profileNameEl = document.querySelector('.profile__name');
const profileJobEl = document.querySelector('.profile__job');
const photoBrowsing = document.querySelector('.photo-browsing');
const photoBrowsingImage = photoBrowsing.querySelector('.photo-browsing__image');
const photoBrowsingCaption = photoBrowsing.querySelector('.photo-browsing__caption');
const photoBrowsingCloseBtn = photoBrowsing.querySelector('.photo-browsing__close-btn');
const photoCard = document.querySelector('#photo-card').content;
const popups = document.querySelectorAll('.popup');
const popupEditProfileEl = document.querySelector('.popup_edit-profile');
const popupAddPhotoEl = document.querySelector('.popup_add-photo');      
const popupEditProfileCloseBtn = document.querySelector('.popup__close-btn_edit-profile');
const popupEditProfileHeading = document.querySelector('.popup__heading_edit-profile');
const profileNameInputEl = document.querySelector('#profileNameInput');
const profileJobInputEl = document.querySelector('#profileJobInput');
const photoNameInputEl = document.querySelector('#photoNameInput'); 
const photoUrlInputEl = document.querySelector('#photoUrlInput');
const popupAddPhotoCloseBtn = document.querySelector('.popup__close-btn_add-photo');
const popupAddPhotoHeading = document.querySelector('.popup__heading_add-photo');
const elementsContainerEl = document.querySelector('.elements');
const editProfileSubmitBtn = popupEditProfileEl.querySelector('.popup__submit-btn');
const addPhotoSubmitBtn = popupAddPhotoEl.querySelector('.popup__submit-btn');

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

enableValidation(profileFormSettings);
enableValidation(photoFormSettings);

function enableEscClose()  {
  document.addEventListener('keydown' , escClose);
}; 
function togglePhotoBrowser(){
  enableEscClose();
  photoBrowsing.classList.toggle('photo-browsing_opened');
};
function createPhotoCard() { 
  const bufferedCardEl = photoCard.cloneNode(true);
  const cardElement = {
    card: bufferedCardEl.querySelector('.element'),
    cardImage: bufferedCardEl.querySelector('.element__image'),
    cardCaption: bufferedCardEl.querySelector('.element__caption'),
    deleteCard: bufferedCardEl.querySelector('.element__trash-can'),
    likeCard: bufferedCardEl.querySelector('.element__like-button')
  }
  /*обработчики событий*/
  cardElement.deleteCard.addEventListener('click', deletePhoto);
  /*поставить класс*/
  cardElement.likeCard.addEventListener('click', function(evt){
  evt.target.classList.toggle('element__like-button_liked');
 /* cardItem.liked = !cardItem.liked;*/
  });
  /*добавляем обработчик для режима просмотра*/
  cardElement.cardImage.addEventListener('click', function(evt){
    const imageUrl = evt.target.style.backgroundImage.slice(5, -2);
    photoBrowsingImage.setAttribute('src', imageUrl);
    photoBrowsingCaption.textContent = cardElement.cardCaption.textContent;
    togglePhotoBrowser();
  })
  return {card:bufferedCardEl, cardElements: cardElement};
};
function displayInitialCards(initialCard)  {
  const cardSetup = createPhotoCard();
/*добавляем содержимое из объекта*/
  cardSetup.cardElements.cardImage.setAttribute('style', `background-image: url(${initialCard.link});`);
  cardSetup.cardElements.cardCaption.textContent = initialCard.name;
  if(initialCard.liked){
    cardElement.likeCard.classList.add('element__like-button_liked');
  };
  displayPhotoCard(cardSetup.card);
};
/*функция которая добавляет карточки из массива каждый раз при загрузке станицы*/
initialCards.forEach((initialCard) => {
  displayInitialCards(initialCard);
});
function openPopup(popupEl)  {
  popupEl.classList.add('popup_opened');
  enableEscClose(popupEl);
}
function editProfile() {
  profileNameInputEl.value = profileNameEl.textContent;
  profileJobInputEl.value = profileJobEl.textContent;
  openPopup(popupEditProfileEl);
};  
function saveProfile() {
  profileNameEl.textContent = profileNameInputEl.value;
  profileJobEl.textContent = profileJobInputEl.value;
}
function displayPhotoCard(bufferedCardEl) {
   /*добавляем разметку на страницу*/
  elementsContainerEl.prepend(bufferedCardEl);
}
function closePopup(){
  openedPopup = document.querySelector('.popup_opened');
  openedPopup.classList.remove('popup_opened');
  disableEscClose();
}; 
function formSubmitEditProfile(evt){
  evt.preventDefault();
  saveProfile();
  closePopup();
}
function savePhoto(cardSetup){
  cardSetup.cardElements.cardImage.setAttribute('style', `background-image: url(${photoUrlInputEl.value});`);
  cardSetup.cardElements.cardCaption.textContent = photoNameInputEl.value;
};
function addPhoto() {
  photoNameInputEl.value = '';
  photoUrlInputEl.value = '';
  openPopup(popupAddPhotoEl);
}
function formSubmitAddPhoto(evt) {
  evt.preventDefault();
  const cardSetup = createPhotoCard();
  savePhoto(cardSetup);
  displayPhotoCard(cardSetup.card);
  closePopup();
};
/*удаление фото*/
function deletePhoto(del){
  del.target.parentElement.remove();
}
function escClose(evt) {
  if(evt.key === 'Escape'){
    closePopup();
  }
};
function disableEscClose()  {
  document.removeEventListener('keydown' , escClose);
}; 

/* Ниже обработчики событий*/

photoBrowsing.addEventListener('click' , event =>{
  if (event.target.classList.contains('photo-browsing_opened')) {
    togglePhotoBrowser();
   }
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
popupEditProfileCloseBtn.addEventListener('click' , closePopup);
editProfileSubmitBtn.addEventListener('click' , formSubmitEditProfile);
addPhotoSubmitBtn.addEventListener('click' , formSubmitAddPhoto);
popupAddPhotoCloseBtn.addEventListener('click' , closePopup);
photoBrowsingCloseBtn.addEventListener('click' , togglePhotoBrowser);
