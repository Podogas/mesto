import css from './index.css';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithButton from '../components/PopupWithButton.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
  profileEditBtn, profileAddBtn, profileNameEl, profileJobEl,profileAvatarEl,
  popupEditProfileFormEl, popupEditProfileEl, popupEditProfileHeadingEl,
  profileNameInputEl, profileJobInputEl, avatarUrlInputEl,popupEditAvatarFormEl, popupAddPhotoFormEl, popupAddPhotoEl,
  popupAddPhotoHeadingEl, photoNameInputEl, photoUrlInputEl, defaultFormSelectors,
  popupPhotoBrowsingEl, popupPhotoBrowsingImageEl, popupPhotoBrowsingCaptionEl
} from '../utils/constants.js';
/*инициализируем класс для пользовательской информации*/
const profileUserInfo = new UserInfo(profileNameEl, profileJobEl, profileAvatarEl);
/*инициализируем класс для режима просмотра фото*/
const popupPhotoBrowsing = new PopupWithImage('.popup__photo-browsing');
/*инициализируем классы для валидации форм , а вызовем их в finally mestoApi.getPageData()
 когда все уже будет подгружено и все экземпляры классов будут созданы*/
const profileFormValidation = new FormValidator(defaultFormSelectors,popupEditProfileFormEl);
const photoFormValidation = new FormValidator(defaultFormSelectors,popupAddPhotoFormEl);
const avatarFormValidation = new FormValidator(defaultFormSelectors,popupEditAvatarFormEl);
/*инициализируем класс програмного интерфейса*/
const mestoApi = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-15',
  headers: {
    authorization: 'd7f02613-0750-4057-8234-33e0d676e4d9',
    'Content-Type': 'application/json'
  }
});
/*Сначала мы получаем всю необходимую информацию, и уже внутри выполняем все что зависит он данных с сервера*/
  mestoApi.getPageData().then(pageData =>{
    /*деструктурируем полученный массив*/
    const [userInfoData, initialCardsData] = pageData;

    const popupEditAvatar = new PopupWithForm('.popup_edit-avatar',{
      formSubmitHandler: (inputValue) => {
        popupEditAvatar._submitBtn.textContent = 'Сохранение...';
        mestoApi.patchAvatar(inputValue.avatarUrl)
        .then(res => {
          profileUserInfo.setUserAvatar({
            avatar: res.avatar
          });
        })
        .finally( res => {
          popupEditAvatar.close();
          popupEditAvatar._submitBtn.textContent = 'Сохранить'
        })
      }
    })
        /*добавляем обработчики*/      
    popupEditAvatar.setEventListeners();
    /*подставляем данные в методы класса profileUserInfo*/
    profileUserInfo.setUserInfo({
    name: userInfoData.name,
    about: userInfoData.about
    })
    profileUserInfo.setUserAvatar({
    avatar: userInfoData.avatar
    })
    /*инициализируем класс для карточек*/
    const cardsContainer = new Section(
    {
      items: initialCardsData,
      renderer: (cardItem) => {
        const newCardEl = createNewCard(cardItem)
        .createCardElement();
        cardsContainer.addItem(newCardEl);
        } 
    },
    '.elements'
    );
    cardsContainer.renderItems();

          /*инициализируем класс для формы подтверждения удаления*/
    const popupConfirmDeletion = new PopupWithButton('.popup_confirm-deletion',{
        formSubmitHandler: (cardData) => {
          popupConfirmDeletion.close();
          mestoApi.deleteCard(cardData.cardId);
          cardData.cardEl.remove();
          cardData.cardEl == null;

        },

      },
    );
        /*добавляем обработчики*/    
    popupConfirmDeletion.setEventListeners();



    /*функция создания карточки*/
    function createNewCard(cardItem){ 
      const bufferedCard = new Card(cardItem,'#photo-card',{
      handleUserId: userInfoData._id,  
      handleCardClick: () => {
        popupPhotoBrowsing.open(cardItem.link, cardItem.name);
      },
      handleDeleteIconClick: (cardData) => {
        popupConfirmDeletion.open();
        popupConfirmDeletion.handleCardToDelete(cardData);
      },
      handleCardLike: (cardId, method) => {
        mestoApi.like(cardId, method).then(
            res => {
            bufferedCard._checkLikeStatus(res.likes);
            }
          )
      }


    });

      return bufferedCard;
    };
    /*инициализируем класс для формы профиля*/
    const popupEditProfile = new PopupWithForm('.popup_edit-profile',
      {
        formSubmitHandler: (inputValue) => {
          popupEditProfile._submitBtn.textContent = 'Сохранение...';
          /*патчим информацию на сервер*/
          mestoApi.patchUserInfo(inputValue)
          .then(data => {
            /*устанавливаем значения инпутов в элементы*/
            profileUserInfo.setUserInfo(data);
          })
          .finally(res => {
           popupEditProfile._submitBtn.textContent = 'Сохранить';
           popupEditProfile.close();
          })
          ;
        }
      },
    );
    /*добавляем обработчики*/
    popupEditProfile.setEventListeners();
    /*инициализируем класс для формы добавления новой фотокарточки*/
    const popupAddPhoto = new PopupWithForm('.popup_add-photo',{
        formSubmitHandler: (inputValue) => {
        popupAddPhoto._submitBtn.textContent = 'Сохранение...';
        const formatedData = {
          name: inputValue.photoName,
          link: inputValue.photoUrl,
        }
        mestoApi.postNewCard(formatedData)
        .then(res => {
          const newCardEl = createNewCard(res)
          .createCardElement();
          cardsContainer.addItem(newCardEl);
          })
        .finally(res => {
           popupAddPhoto._submitBtn.textContent = 'Сохранить';
           popupAddPhoto.close();
          });
        }
      },
    );
    /*добавляем обработчики*/    
    popupAddPhoto.setEventListeners();    

    function editProfile() {
    profileNameInputEl.value = userInfoData.name;
    profileJobInputEl.value = userInfoData.about;
    profileFormValidation.refreshValidation();
    popupEditProfile.open();
    };
    function addPhoto() {
      photoFormValidation.refreshValidation();
      popupAddPhoto.open();
    };
    function updateAvatar(){
      avatarUrlInputEl.value = userInfoData.avatar
      photoFormValidation.refreshValidation();
      popupEditAvatar.open()
    }
    profileEditBtn.addEventListener('click', editProfile);
    profileAddBtn.addEventListener('click', addPhoto);
    profileAvatarEl.addEventListener('click', updateAvatar);




}).finally( ()=> {
  /*вызываем валидацию именно тут, потому что в этот момент страница готова*/
  profileFormValidation.enableValidation();
  photoFormValidation.enableValidation();
  avatarFormValidation.enableValidation();
  /*добавляем обработчики*/
  popupPhotoBrowsing.setEventListeners();
});

