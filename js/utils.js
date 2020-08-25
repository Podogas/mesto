/*Функции отвечающие за открытие и закрытие попапа, а так же за включение и выключение событий отвечающих за закрытие попапа*/

/*Не могли бы вы мне пожалуйста подсказать чем отличается файл utils от Card, 
почему в utils мы не можем и экспортировать и импортировать как в Card.js?
Сначала расскажу как я это понимаю, 
 в Card.js мы реализуем модуль с функционалом для того что бы разбить программу
 на логические блоки каждый из которых выполняет свою функцию.
 А в файле utils.js мы храним переменные и функции которые используются в разных файлах???
 Я далеко не уверен в верности своей догадки, поэтому если есть возмрожность скажите пожалуйста что можно поискать по этой теме,
 я пытался сформулировать запрос. Но ничего релевантного не нашел
Вполне вероятно что это не ваша работа, а наставника, поэтому вы меня можете направить к нему)
просто поскольку вы погружены в ситуацию, то я решил что проще спросить у вас, в любом случае спасибо.
 */

function disableEscClose(){
  document.removeEventListener('keydown' , escClose);
};
function disableCloseBtns(evt){
  evt.target.setAttribute('disabled', '');
};

function closePopup(evt){
  document.querySelector('.popup_opened')
  .classList.remove('popup_opened');
  if(evt){
    disableCloseBtns(evt);
  };
  disableEscClose();
};
function escClose(evt) {
  if(evt.key === 'Escape'){
    /*можно и не передавать false, но мне кажется это выразительнее*/
    closePopup(false);
  };
};
function enableCloseBtns(closeBtn)  {
  closeBtn.removeAttribute('disabled');
};
function enableEscClose()  {
  document.addEventListener('keydown' , escClose);
};
const openPopup = (popupEl) => {
  enableCloseBtns(popupEl.querySelector('.popup__close-btn'));
  enableEscClose(popupEl);
  popupEl.classList.add('popup_opened');
};
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
export {popupPhotoBrowsingEl, popupPhotoBrowsingImageEl, popupPhotoBrowsingCaptionEl, initialCards, openPopup, closePopup};