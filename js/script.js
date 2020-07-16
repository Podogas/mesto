const profileEditBtn = document.querySelector('.profile__edit-button');
const profileAddBtn = document.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const popupWindow = popup.querySelector('popup__window');
const popupHeading = popup.querySelector('.popup__heading')
const popupForm = popup.querySelector('.popup__input-container');
const closePopupBtn = popup.querySelector('.popup__close-btn');
const photoBrowsing = document.querySelector('.photo-browsing');
const photoBrowsingImage = photoBrowsing.querySelector('.photo-browsing__image');
const photoBrowsingCaption = photoBrowsing.querySelector('.photo-browsing__caption');
const photoBrowsingCloseBtn = photoBrowsing.querySelector('.photo-browsing__close-btn');
/*элементы DOM*/
const photoCard = document.querySelector('#photo-card').content;
/*здесь мы получаем содержимое темплейта для карточек с фото*/ 
const popupInputs = Array.from(popupForm.children).filter(function (item) {
    return item.type;
});
/*Здесь мы создаем массив текстовых полей ввода из псевдомассива детей формы задумка в том что бы в будущем при создании
дополнительных полей нам можно было их просто выбирать*/

const profile = {
  name: document.querySelector('.profile__name'),
  job: document.querySelector('.profile__job')
};
/*это объект с информацией о пользователе.*/

const initialCards = [
    {
        id: 'photo1',
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        id: 'photo2',
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        id: 'photo3',
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    { 
        id: 'photo4',
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {   
        id: 'photo5',
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        id: 'photo6',
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }

]; 
/*это массив с объектами в которых хранятся данные для карточек с фото*/

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

  cardImage.setAttribute("style", `background-image: url(${cardItem.link});`);

  cardCaption.textContent = cardItem.name;
  /*добавляем содержимое из объекта*/
  document.querySelector('.elements').append(cardElement);
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
    
  }


initialCards.forEach(card => displayPhoto(card));
/*функция которая добавляет карточки каждый раз при загрузке станицы*/

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



function editProfile() {


  popupInputs[0].addEventListener('input', () => {
      isValid(popupInputs)
    });
  popupHeading.textContent = 'Редактировать профиль';
  popupInputs[0].setAttribute('minlength', 2); 
  popupInputs[0].setAttribute('maxlength', 40); 
  popupInputs[0].value= profile.name.textContent;
  popupInputs[0].placeholder= 'Имя';
  popupInputs[0].name= 'profile-edit-input';
  popupInputs[1].addEventListener('input', () => {
      isValid(popupInputs)
    });
  popupInputs[1].setAttribute('minlength', 2); 
  popupInputs[1].setAttribute('maxlength', 200);
  popupInputs[1].setAttribute('type', 'text'); 
  popupInputs[1].value= profile.job.textContent;
  popupInputs[1].placeholder= 'Подпись';
  popupInputs[1].name= 'profile-edit-input';
  popupInputs[2].classList.remove('popup__submit-btn_add-image');
  popupInputs[2].classList.add('popup__submit-btn_edit-profile');
  popupInputs[2].removeEventListener('click', formSubmitAddPhoto);
  popupInputs[2].addEventListener('click', formSubmitProfile);
  togglePopup();
  isValid(popupInputs);
}

function addPhoto() {
  popupHeading.textContent = 'Новое место';
  popupInputs[0].addEventListener('input', () => {
      isValid(popupInputs)
    });
  popupInputs[0].setAttribute('minlength', 1); 
  popupInputs[0].setAttribute('maxlength', 30); 
  popupInputs[0].value='';
  popupInputs[0].placeholder= 'Название';
  popupInputs[0].name= 'add-image-input';
  popupInputs[1].addEventListener('input', () => {
      isValid(popupInputs)
    });
  popupInputs[1].removeAttribute('minlength'); 
  popupInputs[1].removeAttribute('maxlength');
  popupInputs[1].setAttribute('type', 'url'); 
  popupInputs[1].value='';
  popupInputs[1].placeholder= 'Ссылка на картинку';
  popupInputs[1].name= 'add-image-input';
  popupInputs[2].classList.remove('popup__submit-btn_edit-profile');
  popupInputs[2].classList.add('popup__submit-btn_add-image');
  popupInputs[2].removeEventListener('click', formSubmitProfile);
  popupInputs[2].addEventListener('click', formSubmitAddPhoto);
  togglePopup();
  isValid(popupInputs);
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

/*тут мы сохраняем фото в массив который наверное когда то потом можно будет отправить на сервер и данные будут сохраняться*/
function savePhoto(){

  const newCard = {

     id: validId(),
     name: popupInputs[0].value.trim(),
     link: popupInputs[1].value.trim()
    };

  initialCards.unshift(newCard);
  
  return newCard;
}
/*удаляем фото из массива*/
function deletePhoto(del){
  let targetToRemove = initialCards.find(data => data.id === del.target.parentElement.id);
  let objectToRemove = initialCards.indexOf(targetToRemove);
  initialCards.splice(objectToRemove, 1);
  del.target.parentElement.remove();
}



function formSubmitProfile (evt) {
  evt.preventDefault();
  
 if  (isValid(popupForm , popupInputs)) {
          profile.name.textContent = popupInputs[0].value;
          profile.job.textContent = popupInputs[1].value;
          togglePopup(); 
        } 
     
};  

function formSubmitAddPhoto(evt) {
  evt.preventDefault();

  if  (isValid(popupForm, popupInputs)) {
    const objPhoto = savePhoto();
    displayPhoto(objPhoto);
    togglePopup();  
  }
};





/* слушатели событий*/
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