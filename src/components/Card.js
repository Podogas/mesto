export default class Card {
  constructor(data, templateElSelector, {handleCardClick}){
    this._name = data.name;
    this._link = data.link;
    this._templateEl = document.querySelector(templateElSelector);
    this._cardEl = this._templateEl.content.querySelector('.element').cloneNode(true);
    this._imageEl = this._cardEl.querySelector('.element__image');
    this._imageCaptionEl = this._cardEl.querySelector('.element__caption');
    this._deleteCardBtn = this._cardEl.querySelector('.element__trash-can');
    this._likeCardBtn = this._cardEl.querySelector('.element__like-button');
    this._handleCardClick = handleCardClick;
    
  }
  _handleImageSrc(){
    this._imageEl.src = this._link;
  };
  _handleCardName(){
    this._imageCaptionEl.textContent = this._name; 
  };
  _handleImageAlt(){
    this._imageEl.setAttribute('alt', this._name);
  };
  _likeCard(){
    this._likeCardBtn.classList.toggle('element__like-button_liked');
  };
  _deleteCard(){
    this._cardEl.remove();
    this._cardEl = null;
  };
  _setEventListeners(){
    this._deleteCardBtn.addEventListener('click', () => {
      this._deleteCard()
    });
    this._likeCardBtn.addEventListener('click', () =>{
      this._likeCard()
    });
    this._imageEl.addEventListener('click', () =>{
       this._handleCardClick();
    });
  }
  createCardElement(){
    this._handleImageSrc();
    this._handleImageAlt();
    this._handleCardName();
    this._setEventListeners();
    return this._cardEl;
  };
};