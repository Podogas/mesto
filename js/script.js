   /*элементы DOM*/
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileAddBtn = document.querySelector('.profile__add-button');
const photoBrowsing = document.querySelector('.photo-browsing');
const photoBrowsingImage = photoBrowsing.querySelector('.photo-browsing__image');
const photoBrowsingCaption = photoBrowsing.querySelector('.photo-browsing__caption');
const photoBrowsingCloseBtn = photoBrowsing.querySelector('.photo-browsing__close-btn');
const photoCard = document.querySelector('#photo-card').content;
const popupEditProfileEl = document.querySelector('.popup_edit-profile');
const popupAddPhotoEl = document.querySelector('.popup_add-photo');      
const profileNameEl = document.querySelector('.profile__name');
const profileJobEl = document.querySelector('.profile__job');
const popup = document.querySelector('.popup');
const popupForm = popup.querySelector('.popup__input-container');
const popupCloseBtn = popup.querySelector('.popup__close-btn');
const popupHeading = popup.querySelector('.popup__heading');


let formElements = [];
let formElementsAttr = [];
function displayPhoto (cardItem) {
  const cardElement = photoCard.cloneNode(true);
  /*выбираем внутри этой разметки элементы с которыми будем работать*/
  const card = cardElement.querySelector('.element');
  const cardImage = cardElement.querySelector('.element__image');
  const cardCaption = cardElement.querySelector('.element__caption');
  const deleteCard = cardElement.querySelector('.element__trash-can');
  const likeCard = cardElement.querySelector('.element__like-button');
  /*добавляем айди для элементов*/
  card.id = cardItem.id;
  /*добавляем содержимое из объекта*/
  cardImage.setAttribute('style', `background-image: url(${cardItem.link});`);
  cardCaption.textContent = cardItem.name;
  if(cardItem.liked){
    likeCard.classList.add('element__like-button_liked');
  }
  /*добавляем разметку на страницу*/
  document.querySelector('.elements').prepend(cardElement);
  
  deleteCard.addEventListener('click', deletePhoto);
  /*поставить класс*/
  likeCard.addEventListener('click', function(evt){
  evt.target.classList.toggle('element__like-button_liked');
  cardItem.liked = !cardItem.liked;
  });

  cardImage.addEventListener('click', function(evt){
    const imageUrl = evt.target.style.backgroundImage.slice(5, -2);
    photoBrowsingImage.setAttribute('src', imageUrl);
    photoBrowsingCaption.textContent = cardItem.name;
    togglePhotoBrowser();
  })
  /*добавляем обработчик для режиима просмотра*/
};
/*функция которая добавляет карточки из массива каждый раз при загрузке станицы*/
initialCards.forEach(card => displayPhoto(card));

function togglePhotoBrowser(){
  enableEscClose();
  photoBrowsing.classList.toggle('photo-browsing_opened');
};
function togglePopup() {
  popup.classList.toggle('popup_opened');
};

function addAttrToFormElems(){
  /*для каждого элемента (которые мы уже берем из массива)*/
  formElements.forEach(element =>{
    /*находим индекс элемента*/
    const indexOfElement = formElements.indexOf(element);
    /*находим атрибуты для этого элемента из массива с атрибутами 
    (индексы всегда будут совпадать, так как в массивы они записываются в одной и той же forEach функции)*/
    const elementAttrs = formElementsAttr[indexOfElement];
   /*добавляем атрибуты инпута, к сожалению проверки лучше чем с условными конструкциями я придуматьт не смог*/
    if(elementAttrs.typeAttr !== undefined){
      element.type = elementAttrs.typeAttr;
    };
    if(elementAttrs.idAttr !== undefined){
      element.id = elementAttrs.idAttr
    };
    if(elementAttrs.placeholderAttr !== undefined){
      element.placeholder = elementAttrs.placeholderAttr
    };
    if(elementAttrs.valueAttr !== undefined){
      element.value = elementAttrs.valueAttr
    };
    /*добавляем классы по одному из массива внутри объекта атрибутов элемента*/
    const classes = elementAttrs.classListAttr.forEach( classAttr =>{
      element.classList.add(classAttr);
      return classAttr;});
    if(elementAttrs.textContent != undefined){
      element.textContent = elementAttrs.textContent;
    }
  })  
}

function generateForm(formSettings, heading){
  /*добавляем заголовок*/
  popupHeading.textContent = heading;
  /*получаем название ключей (в нашем случае каждый ключ объекта это объект с информацией о создаваемом поле ввода)*/
  const inputs = Object.keys(formSettings);
  /*для каждого названия поля ввода выполняем следующие действия: */
  inputs.forEach(input => {
    /*получаем список атрибутов инпута уже как объект*/
    const inputElAttr = formSettings[input];
    /*сразу добавляем в массив с атрибутами элементов формы*/
    formElementsAttr.push(inputElAttr);
    /*создаем элемент по типу который указан*/
    const inputEl = document.createElement(inputElAttr.elType);
    /*вставляем в разметку */
    popupForm.appendChild(inputEl);
    /*проверяем есть ли сообщение об ошибке как элемент*/
    if(inputElAttr.errElement){
      const errElement = document.createElement('span');
      popupForm.appendChild(errElement);
      /*и сразу добавляем этому элементу необходимые атрибуты*/
      errElement.classList.add('popup__input-error-message');
      if(inputElAttr.idAttr !== undefined){
        errElement.id = inputElAttr.idAttr+'-err';
      };
    };
    /*заполняем массив элементами формы*/
    formElements.push(inputEl);
    });
  /*вызываем функцию добавления атрибутов к элементам формы*/
  addAttrToFormElems();
  const popupSubmitBtn = popupForm.querySelector('.popup__submit-btn');
  popupSubmitBtn.addEventListener('click' ,(evt =>{
    evt.preventDefault();
  }))
  /*включаем валидацию, и передаем ей массив со всеми элементами формы, и со всеми атрибутами к этим элементам */
  enableValidation(formElements , formElementsAttr , popupSubmitBtn);
};  

function deleteForm() {
  while (popupForm.lastElementChild) {
    popupForm.removeChild(popupForm.lastElementChild);
  }
  formElements = [];
  formElementsAttr = [];
}


                                  /*EDIT PROFILE*/                                     
function editProfile() {
  generateForm(refreshPopupFormProfile(), 'Редактировать профиль');
  enableEscClose();
  togglePopup();
};

                                  /*ADD PHOTO*/
function addPhoto() {
  generateForm(popupFormPhoto, 'Новое место');
  enableEscClose();
  
  /*popupSubmitBtn.addEventListener('click',formSubmitAddPhoto);*/
  togglePopup();
}

function formSubmitEditProfile(){
  const profileNameInputEl = popup.querySelector(`#${refreshPopupFormProfile().profileNameInput.idAttr}`); 
  const profileJobInputEl = popup.querySelector(`#${refreshPopupFormProfile().profileJobInput.idAttr}`);
  profile.name = profileNameInputEl.value;
  profile.job = profileJobInputEl.value;
  profileNameEl.textContent = profile.name;
  profileJobEl.textContent = profile.job;
  refreshPopupFormProfile();
  closePopup();
}
function formSubmitAddPhoto() {
  const objPhoto = savePhoto();
  displayPhoto(objPhoto);
  closePopup();
};
function submitPopupForm(evt){
  evt.preventDefault();
  if(evt.target.classList.contains('popup__submit-btn_edit-profile')){
    formSubmitEditProfile();
  }; 
  if(evt.target.classList.contains('popup__submit-btn_edit-photo')){
    formSubmitAddPhoto();
  };
}
/*тут мы сохраняем фото в массив который наверное когда то потом можно будет
 отправить на сервер и данные будут сохраняться*/
function savePhoto(){
  const photoNameInputEl = popup.querySelector('#photoNameInput'); 
  const photoUrlInput = popup.querySelector('#photoUrlInput');
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
  const targetToRemove = initialCards.find(data => data.id === del.target.parentElement.id);
  const objectToRemove = initialCards.indexOf(targetToRemove);
  initialCards.splice(objectToRemove, 1);
  del.target.parentElement.remove();
}
function escClose() {
    if(event.key === 'Escape'){
      if(popup.classList.contains('popup_opened')){
        closePopup();
      };
      if(photoBrowsing.classList.contains('photo-browsing_opened')){
        togglePhotoBrowser();
      };
      document.removeEventListener('keydown' , escClose);
    };
};
function enableEscClose()  {
  document.addEventListener('keydown' , escClose);
}; 
function closePopup(){
  deleteForm();  
  togglePopup();
}; 
/* Ниже обработчики событий*/

photoBrowsing.addEventListener('click' , event =>{
  if (event.target.classList.contains('photo-browsing_opened')) {
    togglePhotoBrowser();
   }
})
popup.addEventListener('click' , event =>{
  if (event.target.classList.contains('popup_opened')) {
    closePopup();
   }
})
profileEditBtn.addEventListener('click', editProfile);
profileAddBtn.addEventListener('click', addPhoto);
popupCloseBtn.addEventListener('click' , closePopup);
photoBrowsingCloseBtn.addEventListener('click' , togglePhotoBrowser);
