const profileEditBtn = document.querySelector('.profile__edit-button');
const profileAddBtn = document.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
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
const popupInput1 = popupInputs[0];
const popupInput2 = popupInputs[1];
const popupSubmitButton = popupInputs[2];
    /*инпуты формы попапа*/

const profile = {
        name: document.querySelector('.profile__name'),
        job: document.querySelector('.profile__job')
    };
/*это объект с информацией о пользователе.*/

const initialCards = [
    {
        id: 'photo6',
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
    {   
        id: 'photo5',
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    { 
        id: 'photo4',
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        id: 'photo3',
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        id: 'photo2',
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        id: 'photo1',
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    }
]; 

/*это массив с объектами в которых хранятся данные для карточек с фото*/