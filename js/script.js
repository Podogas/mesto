let profileEditBtn = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');

let profile = {
  name: document.querySelector('.profile__name'),
  job: document.querySelector('.profile__job')
}


function openPopup() {
  let profileForm = document.querySelector('.profile-form__input-container'); 
  let profileNameInput = profileForm.querySelector('.profile-form__item_el_name');
  let profileJobInput = profileForm.querySelector('.profile-form__item_el_job');
  let closePopupBtn = document.querySelector('.profile-form__close-btn');
  let profileSubmitBtn = profileForm.querySelector('.profile-form__submit-btn');
/*  не уверен где лучше хранить эти переменные, но решил тут, 
  раз уж эти элементы у нас появляются на экране только при вызове функции. 
  Так же не знаю как это скажется на скорости открытия попапа.
*/  
  profileNameInput.setAttribute('value', profile.name.textContent);
  profileJobInput.setAttribute('value', profile.job.textContent); 
  popup.classList.add('popup_opened'); 
  closePopupBtn.addEventListener('click', closePopup);
  profileEditBtn.removeEventListener('click', openPopup);  
  function closePopup() {
    popup.classList.remove('popup_opened');
    profileEditBtn.addEventListener('click', openPopup);
    closePopupBtn.removeEventListener('click', closePopup);
  }
  function formSubmitHandler (sendProfileForm) {
    sendProfileForm.preventDefault();
    profile.name.textContent = profileNameInput.value;
    profile.job.textContent = profileJobInput.value;
    closePopup();
  }

profileForm.addEventListener('submit', formSubmitHandler);
}

profileEditBtn.addEventListener('click', openPopup);



