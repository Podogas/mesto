export default class Card {
  constructor(data, templateElSelector, {handleUserId, handleCardClick,handleDeleteIconClick, handleCardLike}){
    this.data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner; 
    this._handleUserId = handleUserId;
    this._templateEl = document.querySelector(templateElSelector);
    this._cardEl = this._templateEl.content.querySelector('.element').cloneNode(true);
    this._imageEl = this._cardEl.querySelector('.element__image');
    this._imageCaptionEl = this._cardEl.querySelector('.element__caption');
    this._likeCardBtn = this._cardEl.querySelector('.element__like-button');
    this._likeCounterEl = this._cardEl.querySelector('.element__like-counter');
    this._handleCardClick = handleCardClick;
    this.handleDeleteIconClick = handleDeleteIconClick;
    this._handleCardLike = handleCardLike;
    this._isLiked = false;
    
  }
  _getLikeMethod(){
    if(this._isLiked){
    return 'DELETE'  
    } else {
    return 'PUT'
    }
  }
 /* код ниже это самое мерзкое что я делал в своей жизни, 
 но я уже настолько отчаился что пришлось поступать так, простите пожалуйста*/
  _checkLikeStatus(likesArray){
    if(likesArray.length === 0){
      this._likeCardBtn.classList.remove('element__like-button_liked');
      this._isLiked = false;
      this._handleLikeCounter(0);
    }
    likesArray.forEach((user) => {
      if(user._id === this._handleUserId){
        this._likeCardBtn.classList.add('element__like-button_liked');
        this._isLiked = true;
        this._handleLikeCounter(likesArray.length);
      } 
      else {
        this._likeCardBtn.classList.remove('element__like-button_liked');
        this._isLiked = false;
        this._handleLikeCounter(likesArray.length);
      };
    })
  }
  _createTrashCanEl(){
    const trashCanEl = document.createElement('button');
    trashCanEl.classList.add('element__trash-can');
    this._cardEl.prepend(trashCanEl);
    trashCanEl.addEventListener('click', () => {
      this.handleDeleteIconClick({
        cardEl: this._cardEl,
        cardId: this._id
      });
    });
  }
  _enableOwnerControls(){
   if(this._handleUserId === this._owner._id){
    this._createTrashCanEl();

   }
  }
  _handleImageSrc(){
    this._imageEl.src = this._link;
  };
  _handleCardName(){
    this._imageCaptionEl.textContent = this._name; 
  };
  _handleLikeCounter(num){
    this._likeCounterEl.textContent = num;
  }
  _handleImageAlt(){
    this._imageEl.setAttribute('alt', this._name);
  };
  _setEventListeners(){
    this._likeCardBtn.addEventListener('click', () =>{
      this._handleCardLike(this._id, this._getLikeMethod());
    });
    this._imageEl.addEventListener('click', () =>{
       this._handleCardClick();
    });
  }
  createCardElement(){
    this._enableOwnerControls();
    this._handleImageSrc();
    this._handleImageAlt();
    this._handleCardName();
    this._handleLikeCounter(this._likes.length);
    this._checkLikeStatus(this._likes);
    this._setEventListeners();
    return this._cardEl;
  };
};