/*объкт с данными профиля*/
const profile = {
  name:'Жак-Ив Кусто',
  job: 'Исследователь океана' 
};
/*пришлось делать так, через странную функцию,
 потому что по какой то причине valueAttr отсавался в том же значении как при загрузке документа*/
function refreshPopupFormProfile(){
const popupFormProfile = {
  profileNameInput: {
    elType: 'input',
    typeAttr: 'text',
    idAttr: 'profileNameInput',
    placeholderAttr: 'Имя',
    valueAttr: profile.name,
    classListAttr: ['popup__input-item', 'popup__input-item_profile-name-input'],
    requiredAttr: true,
    minlengthAttr: '2',
    maxlengthAttr: '40',
    errElement: true   
  },
  profileJobInput: {
    elType: 'input',
    typeAttr: 'text',
    idAttr: 'profileJobInput',
    placeholderAttr: 'О себе',
    valueAttr: profile.job,
    classListAttr: ['popup__input-item' ,'popup__input-item_profile-job-input'],
    requiredAttr: true,
    minlengthAttr: '2',
    maxlengthAttr: '200',
    errElement: true    
  },
  profileSubmitBtn: {
    elType: 'button',
    typeAttr: 'submit',
    classListAttr: ['popup__submit-btn' ,'popup__submit-btn_edit-profile'],
    textContent: 'Сохранить'
  }   
};
return popupFormProfile;
};

const popupFormPhoto ={
  photoNameInput: {
    elType: 'input',
    typeAttr: 'text',
    idAttr: 'photoNameInput',
    placeholderAttr: 'Название',
    classListAttr: ['popup__input-item', 'popup__input-item_photo-name-input'],
    requiredAttr: true,
    minlengthAttr: '1',
    maxlengthAttr: '30',
    errElement: true   
    },
  photoUrlInput: {
    elType: 'input',
    typeAttr: 'url',
    idAttr: 'photoUrlInput',
    placeholderAttr: 'Ссылка на картинку',
    classListAttr: ['popup__input-item' ,'popup__input-item_photo-url-input'],
    requiredAttr: true,
    errElement: true    
    },
  photoSubmitBtn: {
    elType: 'button',
    typeAttr: 'submit',
    classListAttr: ['popup__submit-btn' ,'popup__submit-btn_edit-photo'],
    textContent: 'Сохранить'
  }       
};

/*это массив с объектами в которых хранятся данные для карточек с фото*/
const initialCards = [
    {
        id: 'photo6',
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
        liked: false
    },
    {   
        id: 'photo5',
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
        liked: false
    },
    { 
        id: 'photo4',
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
        liked: false
    },
    {
        id: 'photo3',
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
        liked: false
    },
    {
        id: 'photo2',
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
        liked: false
    },
    {
        id: 'photo1',
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
        liked: false
    }
]; 
