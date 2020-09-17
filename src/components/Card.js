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
    this._handleCardClick = handleCardClick;
    this.handleDeleteIconClick = handleDeleteIconClick;
    this._handleCardLike = handleCardLike;
    this._isLiked = false; 
  }
  _getTemplate() {
    return this._templateEl.content.querySelector('.element').cloneNode(true);
  }
  _getLikeMethod(){
    if(this._isLiked){
    return 'DELETE'  
    } else {
    return 'PUT'
    }
  }
 
 /*пока что не получилоось исправить эту реализацию.
я хотел разделить то что происходит у пользователя и запросы на сервер
конекретнее я хотел сделать так что бы при нажании на лайк он сначала красился и к нему добавлялись 1 (или убиралась)
а затем уже уходил запрос на сервер, возвращал ответ и тогда ответ бы снова перезаписывал свойства элемента лайка
проблема в том что если сделать дабликлик то запросы почему то уходят с одинаковым методом, как будто бы this._isLiked
не успевает перезаписать значение*/

  cardIsLiked(likesArray){
    if(likesArray.length === 0){
      this._likeCardBtn.classList.remove('element__like-button_liked');
      this._handleLikeCounter(likesArray.length);
      this._isLiked = false; 
    }
    likesArray.find((item)=>{
      if(item._id === this._handleUserId){
        this._likeCardBtn.classList.add('element__like-button_liked'); 
        this._handleLikeCounter(likesArray.length);
        this._isLiked = true; 
        return true
      } else {
        this._likeCardBtn.classList.remove('element__like-button_liked');
        this._handleLikeCounter(likesArray.length);
        this._isLiked = false; 
        return false
      }
    });
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
  _handleCardContent(){
    this._imageEl.src = this._link;
    this._imageCaptionEl.textContent = this._name;
    this._imageEl.setAttribute('alt', this._name);
  }
  _handleLikeCounter(num){
    this._likeCounterEl.textContent = num;
  }
  _setEventListeners(){
    this._likeCardBtn.addEventListener('click', () =>{
      this._handleCardLike(this._id, this._getLikeMethod());
    });
    this._imageEl.addEventListener('click', () =>{
       this._handleCardClick();
    });
  }
  createCardElement(){
    this._cardEl = this._getTemplate();
    this._imageEl = this._cardEl.querySelector('.element__image');
    this._imageCaptionEl = this._cardEl.querySelector('.element__caption');
    this._likeCardBtn = this._cardEl.querySelector('.element__like-button');
    this._likeCounterEl = this._cardEl.querySelector('.element__like-counter');
    this._enableOwnerControls();
    this._handleCardContent();
    this._handleLikeCounter(this._likes.length);
    this.cardIsLiked(this._likes);
    this._setEventListeners();
    return this._cardEl;
  };
  removeCard() {
    this._cardEl.remove();
    this._cardEl = null;
  }
};
