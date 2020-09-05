  /*Элементы попапа просмотра фотографий*/
const popupPhotoBrowsingEl = document.querySelector('.popup__photo-browsing');
const popupPhotoBrowsingImageEl = popupPhotoBrowsingEl.querySelector('.popup__image-photo-browsing');
const popupPhotoBrowsingCaptionEl = popupPhotoBrowsingEl.querySelector('.popup__caption-photo-browsing');

const initialCards = [
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
        liked: false
    },
    {  
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
        liked: false
    },
    { 
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
        liked: false
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
        liked: false
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
        liked: false
    },
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
        liked: false
    }
]; 
export {popupPhotoBrowsingEl, popupPhotoBrowsingImageEl, popupPhotoBrowsingCaptionEl, initialCards};