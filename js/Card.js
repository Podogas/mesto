import {popupPhotoBrowsingEl, popupPhotoBrowsingImageEl, popupPhotoBrowsingCaptionEl, openPopup} from './index.js';
export default class Card {
  constructor(data, templateElSelector){
    this._name = data.name;
    this._link = data.link;
    this._templateEl = document.querySelector(templateElSelector);
    this._cardEl = this._templateEl.content.cloneNode(true);
    this._imageEl = this._cardEl.querySelector('.element__image');
    this._imageCaptionEl = this._cardEl.querySelector('.element__caption');
    this._deleteCardBtn = this._cardEl.querySelector('.element__trash-can');
    this._likeCardBtn = this._cardEl.querySelector('.element__like-button');
  }
  _handleImageSrc(){
    this._imageEl.setAttribute('style', `background-image: url(${this._link});`);
  };
  _handleCardName(){
    this._imageCaptionEl.textContent = this._name; 
  };
  _setPhotoBrowsingContent(){
    popupPhotoBrowsingImageEl.setAttribute('src', this._link);
    popupPhotoBrowsingCaptionEl.textContent = this._name;
  };
  _resetPhotoBrowsingContent(){
    popupPhotoBrowsingImageEl.setAttribute('src', '');
    popupPhotoBrowsingCaptionEl.textContent = '';
  }
  _likeCard(){
  this._likeCardBtn.classList.toggle('element__like-button_liked');
  };
  _deleteCard(){
    this._deleteCardBtn.parentElement.remove();
  };
  _setEventListeners(){
    this._deleteCardBtn.addEventListener('click', () => {
      this._deleteCard()
    });
    this._likeCardBtn.addEventListener('click', () =>{
      this._likeCard()
    });
    this._imageEl.addEventListener('click', () =>{
      this._resetPhotoBrowsingContent();
      this._setPhotoBrowsingContent();  
      openPopup(popupPhotoBrowsingEl);
    });
  }
  createCardElement(){
    this._handleImageSrc();
    this._handleCardName();
    this._setEventListeners();
    return this._cardEl;
  };
};