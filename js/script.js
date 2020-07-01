const profileEditBtn = document.querySelector('.profile__edit-button');
const profileAddBtn = document.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
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
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }

]; 
/*это массив с объектами в которых хранятся данные для карточек с фото*/



function togglePopup() {  
popup.classList.toggle('popup_opened');
}
 

function togglePhotoBrowser(){
  photoBrowsing.classList.toggle('photo-browsing_opened');
}

initialCards.forEach(function (cardItem) {
  /*перебираем массив, каждый cardItem это объект, следовательно мы можем обращаться к его ключам*/
  const cardElement = photoCard.cloneNode(true);
  /*копируем разметку из темплейта*/
  const cardImage = cardElement.querySelector('.element__image');
  const cardCaption = cardElement.querySelector('.element__caption');
  const deleteCard = cardElement.querySelector('.element__trash-can');
  const likeCard = cardElement.querySelector('.element__like-button');
  /*выбираем внутри этой разметки элементы с которыми будем работать*/
  cardImage.setAttribute("style", `background-image: url(${cardItem.link});`);
  cardCaption.textContent = cardItem.name;
  /*добавляем содержимое из объекта*/
  document.querySelector('.elements').append(cardElement);
  /*добавляем разметку на страницу*/
    deleteCard.addEventListener('click', function(evt){   
      evt.target.parentElement.remove();
    })
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
    
  }) 
  

function editProfile() {
  popupInputs[0].value= profile.name.textContent;
  popupInputs[0].placeholder= 'Имя';
  popupInputs[0].name= 'profile-edit-input';
  popupInputs[1].value= profile.job.textContent;
  popupInputs[1].placeholder= 'Подпись';
  popupInputs[1].name= 'profile-edit-input';
  popupInputs[2].classList.remove('popup__submit-btn_add-image');
  popupInputs[2].classList.add('popup__submit-btn_edit-profile');
  popupInputs[2].removeEventListener('click', formSubmitAddPhoto);
  popupInputs[2].addEventListener('click', formSubmitProfile);
  togglePopup();
}

function addPhoto() {
  popupInputs[0].value='';
  popupInputs[0].placeholder= 'Название';
  popupInputs[0].name= 'add-image-input';
  popupInputs[1].value='';
  popupInputs[1].placeholder= 'Ссылка на картинку';
  popupInputs[1].name= 'add-image-input';
  popupInputs[2].classList.remove('popup__submit-btn_edit-profile');
  popupInputs[2].classList.add('popup__submit-btn_add-image');
  popupInputs[2].removeEventListener('click', formSubmitProfile);
  popupInputs[2].addEventListener('click', formSubmitAddPhoto);
  togglePopup();
}


function formSubmitProfile (evt) {
  evt.preventDefault();

 if  ((popupInputs[0].value.trim().length > 0) && (popupInputs[1].value.trim().length > 0)) {
          profile.name.textContent = popupInputs[0].value;
          profile.job.textContent = popupInputs[1].value;
        } else {
        alert("Пожалуйста заполните все поля");
      }
    togglePopup();  
};  

function formSubmitAddPhoto(evt) {
  evt.preventDefault();

 if  ((popupInputs[0].value.trim().length > 0) && (popupInputs[1].value.trim().length > 0)) {
          const newCard = 
            {
             name: popupInputs[0].value.trim(),
             link: popupInputs[1].value.trim()
            };
          
          initialCards.unshift(newCard);
          /*добавляем объект в массив (пусть будет)*/
          const cardElement = photoCard.cloneNode(true);
          /*копируем разметку из темплейта*/
          const cardImage = cardElement.querySelector('.element__image');
          const cardCaption = cardElement.querySelector('.element__caption');
          const deleteCard = cardElement.querySelector('.element__trash-can');
          const likeCard = cardElement.querySelector('.element__like-button');
          /*выбираем внутри этой разметки элементы с которыми будем работать*/
          cardImage.setAttribute("style", `background-image: url(${newCard.link});`);
          cardImage.setAttribute("alt", `По какой то причине ваше изображение не загрузилось, пожалуйста проверьте ссылку`);
          cardCaption.textContent = newCard.name;
          /*добавляем содержимое из объекта*/
          document.querySelector('.elements').prepend(cardElement);
          /*добавляем разметку на страницу*/
          deleteCard.addEventListener('click', function(evt){
          evt.target.parentElement.remove(); 
          })
          /* удаляем карточку со страницы*/
          likeCard.addEventListener('click', function(evt){
          evt.target.classList.toggle('element__like-button_liked')
          })
          /*поставить класс*/
          cardImage.addEventListener('click', function(evt){
      const imageUrl = evt.target.style.backgroundImage.slice(5, -2);
      photoBrowsingImage.setAttribute('src', imageUrl);
      photoBrowsingCaption.textContent = newCard.name;
      togglePhotoBrowser();
    }
        )} else {
        alert("Пожалуйста заполните все поля");
      }
    togglePopup();  
};     


profileEditBtn.addEventListener('click', editProfile);
profileAddBtn.addEventListener('click', addPhoto);
closePopupBtn.addEventListener('click', togglePopup);
photoBrowsingCloseBtn.addEventListener('click' , togglePhotoBrowser);