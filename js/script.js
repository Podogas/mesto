function displayPhoto (cardItem) {
  const cardElement = photoCard.cloneNode(true);
  const card = cardElement.querySelector('.element');
  const cardImage = cardElement.querySelector('.element__image');
  const cardCaption = cardElement.querySelector('.element__caption');
  const deleteCard = cardElement.querySelector('.element__trash-can');
  const likeCard = cardElement.querySelector('.element__like-button');
  /*выбираем внутри этой разметки элементы с которыми будем работать*/
  card.id = cardItem.id;
  /*добавляем айди для элементов*/
  cardImage.setAttribute('style', `background-image: url(${cardItem.link});`);
  cardCaption.textContent = cardItem.name;
  /*добавляем содержимое из объекта*/
  document.querySelector('.elements').prepend(cardElement);
  /*добавляем разметку на страницу*/
  deleteCard.addEventListener('click', deletePhoto);
  likeCard.addEventListener('click', function(evt){
  evt.target.classList.toggle('element__like-button_liked')
  })
  /*поставить класс*/
  cardImage.addEventListener('click', function(evt){
    const imageUrl = evt.target.style.backgroundImage.slice(5, -2);
    photoBrowsingImage.setAttribute('src', imageUrl);
    photoBrowsingCaption.textContent = cardItem.name;
    togglePhotoBrowser();
  })
  /*добавляем обработчик для режиима просмотра*/
}

initialCards.forEach(card => displayPhoto(card));
/*функция которая добавляет карточки из массива каждый раз при загрузке станицы*/

function togglePopup() {  
  popup.classList.toggle('popup_opened');
}
 
function togglePhotoBrowser(){
  photoBrowsing.classList.toggle('photo-browsing_opened');
}

function keyBoardClose() {
  if(popup.classList.contains('popup_opened')){
    togglePopup();
  } else if(photoBrowsing.classList.contains('photo-browsing_opened')) {
    togglePhotoBrowser();
  }
}

function generatePopupForm(formName) {
  popupInput1.addEventListener('input', () => {
      isValid(popupInputs)
    });
  popupInput2.addEventListener('input', () => {
      isValid(popupInputs)
    });

    if(formName === 'profileForm'){
      popupHeading.textContent = 'Редактировать профиль';
      popupInput1.setAttribute('minlength', 2); 
      popupInput1.setAttribute('maxlength', 40); 
      popupInput1.value= profile.name.textContent;
      popupInput1.placeholder= 'Имя';
      popupInput1.name= 'profile-edit-input';
      popupInput2.setAttribute('minlength', 2); 
      popupInput2.setAttribute('maxlength', 200);
      popupInput2.setAttribute('type', 'text'); 
      popupInput2.value= profile.job.textContent;
      popupInput2.placeholder= 'Подпись';
      popupInput2.name= 'profile-edit-input';
      popupSubmitButton.classList.remove('popup__submit-btn_add-image');
      popupSubmitButton.classList.add('popup__submit-btn_edit-profile');
      popupSubmitButton.removeEventListener('click', formSubmitAddPhoto);
      popupSubmitButton.addEventListener('click', formSubmitProfile);
    }
    if(formName === 'photoForm'){
      popupHeading.textContent = 'Новое место';
      popupInput1.setAttribute('minlength', 1); 
      popupInput1.setAttribute('maxlength', 30); 
      popupInput1.value='';
      popupInput1.placeholder= 'Название';
      popupInput1.name= 'add-image-input';
      popupInput2.removeAttribute('minlength'); 
      popupInput2.removeAttribute('maxlength');
      popupInput2.setAttribute('type', 'url'); 
      popupInput2.value='';
      popupInput2.placeholder= 'Ссылка на картинку';
      popupInput2.name= 'add-image-input';
      popupSubmitButton.classList.remove('popup__submit-btn_edit-profile');
      popupSubmitButton.classList.add('popup__submit-btn_add-image');
      popupSubmitButton.removeEventListener('click', formSubmitProfile);
      popupSubmitButton.addEventListener('click', formSubmitAddPhoto);
    }
}
/*как меня и просили в прошлом ревью, создал функцию генерации формы.*/

function editProfile() {
  generatePopupForm('profileForm');
  togglePopup();
  isValid(popupInputs);
}

function addPhoto() {
  generatePopupForm('photoForm');
  togglePopup();
  isValid(popupInputs);
}

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
/*это функция которая генерирует уникальное id для фотографии*/

/*тут мы сохраняем фото в массив который наверное когда то потом можно будет
 отправить на сервер и данные будут сохраняться*/
function savePhoto(){
  const newCard = {
    id: validId(),
    name: popupInput1.value.trim(),
    link: popupInput2.value.trim()
  };
  initialCards.unshift(newCard);
 /* здесь я использую именно аншифт тк. в случае если в будующем контент при загрузке страницы
  будет загружаться из массива initialCards, в котором будут сохранены наши добавленные фото
  то нам понадобится что бы новые фото были в начале*/
  return newCard;
}

function deletePhoto(del){
  const targetToRemove = initialCards.find(data => data.id === del.target.parentElement.id);
  const objectToRemove = initialCards.indexOf(targetToRemove);
  initialCards.splice(objectToRemove, 1);
  del.target.parentElement.remove();
}
/*удаление фото из массива*/

function formSubmitProfile (evt) {
  evt.preventDefault();
  if(isValid(popupForm, popupInputs)) {
    profile.name.textContent = popupInput1.value;
    profile.job.textContent = popupInput2.value;
    togglePopup(); 
  } 
};  

function formSubmitAddPhoto(evt) {
  evt.preventDefault();
  if(isValid(popupForm, popupInputs)) {
    const objPhoto = savePhoto();
    displayPhoto(objPhoto);
    togglePopup();  
  }
};

/* Ниже обработчики событий*/
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' || event.keyCode === 27) {
    keyBoardClose();
  }
});

popup.addEventListener('click' , event =>{
  if (event.target.classList.contains('popup_opened')) {
    togglePopup();
  } 
})

photoBrowsing.addEventListener('click' , event =>{
  if (event.target.classList.contains('photo-browsing_opened')) {
    togglePhotoBrowser();
   }
})

profileEditBtn.addEventListener('click', editProfile);
profileAddBtn.addEventListener('click', addPhoto);
closePopupBtn.addEventListener('click', togglePopup);
photoBrowsingCloseBtn.addEventListener('click' , togglePhotoBrowser);