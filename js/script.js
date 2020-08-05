/*получился довольно сумбурный код, думаю проблема в том что он очень много раз переписывался
(4 раза, 3 из которых я разными способами пытался сделать динамическое добавление то всего попапа, то формы)*/

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

function refreshProfile()  {
  profileNameEl.textContent = profile.name;
  profileJobEl.textContent = profile.job;
}
function saveProfile() {
  profile.name = profileNameInputEl.value;
  profile.job = profileJobInputEl.value;
}
function displayPhotoCard(bufferedCardEl, cardElement, cardItem) {
   /*добавляем разметку на страницу*/
  elementsContainerEl.prepend(bufferedCardEl);
  cardElement.deleteCard.addEventListener('click', deletePhoto);
  /*поставить класс*/
  cardElement.likeCard.addEventListener('click', function(evt){
  evt.target.classList.toggle('element__like-button_liked');
  cardItem.liked = !cardItem.liked;
  });
  /*добавляем обработчик для режиима просмотра*/
  cardElement.cardImage.addEventListener('click', function(evt){
    const imageUrl = evt.target.style.backgroundImage.slice(5, -2);
    photoBrowsingImage.setAttribute('src', imageUrl);
    photoBrowsingCaption.textContent = cardItem.name;
    togglePhotoBrowser();
  })
}
function createPhotoCard (cardItem) {
  const bufferedCardEl = photoCard.cloneNode(true);
  const cardElement = {
    card: bufferedCardEl.querySelector('.element'),
    cardImage: bufferedCardEl.querySelector('.element__image'),
    cardCaption: bufferedCardEl.querySelector('.element__caption'),
    deleteCard: bufferedCardEl.querySelector('.element__trash-can'),
    likeCard: bufferedCardEl.querySelector('.element__like-button')
  }
  /*добавляем айди для элементов*/
  cardElement.card.id = cardItem.id;
  /*добавляем содержимое из объекта*/
  cardElement.cardImage.setAttribute('style', `background-image: url(${cardItem.link});`);
  cardElement.cardCaption.textContent = cardItem.name;
  if(cardItem.liked){
    cardElement.likeCard.classList.add('element__like-button_liked');
  }
  displayPhotoCard(bufferedCardEl, cardElement, cardItem);
};
/*функция которая добавляет карточки из массива каждый раз при загрузке станицы*/
initialCards.forEach(card => {
  createPhotoCard(card);
});

function togglePhotoBrowser(){
  enableEscClose();
  photoBrowsing.classList.toggle('photo-browsing_opened');
};
function openPopup(popupEl)  {
  popupEl.classList.add('popup_opened');
  enableEscClose(popupEl);
}
function closePopup(){
  openedPopup = document.querySelector('.popup_opened');
  openedPopup.classList.remove('popup_opened');
  disableEscClose();
}; 
function formSubmitEditProfile(evt){
  evt.preventDefault();
  saveProfile();
  refreshProfile();
  closePopup();
}
                                    
function editProfile() {
  profileNameInputEl.value = profile.name;
  profileJobInputEl.value = profile.job;
  enableValidation({
    formSelector: '.popup__input-container_edit-profile',
    inputSelector: '.popup__input-item_edit-profile',
    submitButtonSelector: '.popup__submit-btn_edit-profile',
    inactiveButtonClass: 'popup__submit-btn_blocked',
    submitButtonAction: formSubmitEditProfile
  });
  openPopup(popupEditProfileEl);
};

function addPhoto() {
  photoNameInputEl.value = '';
  photoUrlInputEl.value = '';
  enableValidation({
    formSelector: '.popup__input-container_add-photo',
    inputSelector: '.popup__input-item_add-photo',
    submitButtonSelector: '.popup__submit-btn_add-photo',
    inactiveButtonClass: 'popup__submit-btn_blocked',
    submitButtonAction: formSubmitAddPhoto
  });
  openPopup(popupAddPhotoEl);
}

function formSubmitAddPhoto(evt) {
  evt.preventDefault();
  const objPhoto = savePhoto();
  createPhotoCard(objPhoto);
  closePopup();
};

/*тут мы сохраняем фото в массив который наверное когда то потом можно будет
 отправить на сервер и данные будут сохраняться*/
function savePhoto(){
  const newCard = {
    id: validId(),
    name: photoNameInputEl.value.trim(),
    link: photoUrlInput.value.trim(),
    liked: false
  };
  initialCards.push(newCard);
  return newCard;
}

/*это функция которая генерирует уникальное id для фотографии*/
function validId(){
  let preGeneratedId = `photo${initialCards.length + 1}`;
  const idList = [];
  initialCards.forEach(data => {
    idList.unshift(data.id);
  })
  while(idList.includes(preGeneratedId)){
    preGeneratedId = preGeneratedId + 1;
  }
  return preGeneratedId;
}
/*удаление фото из массива*/
function deletePhoto(del){
  del.target.parentElement.remove();
}
function escClose(evt) {
  if(evt.key === 'Escape'){
    closePopup();
  }
};

function enableEscClose()  {
  document.addEventListener('keydown' , escClose);
}; 
function disableEscClose()  {
  document.removeEventListener('keydown' , escClose);
}; 

refreshProfile();
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
popupAddPhotoCloseBtn.addEventListener('click' , closePopup);
photoBrowsingCloseBtn.addEventListener('click' , togglePhotoBrowser);
