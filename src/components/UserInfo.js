export default class UserInfo{
  constructor(profileNameEl, profileJobEl, profileAvatarEl){
    this._profileNameEl = profileNameEl;
    this._profileJobEl = profileJobEl;
    this._profileAvatarEl = profileAvatarEl;
  }

  setUserInfo(data){
    this._profileNameEl.textContent = data.name;
    this._profileJobEl.textContent = data.about;

  }
  setUserAvatar(data){
    this._profileAvatarEl.style.cssText = `background-image:url(${data.avatar})`;
  }
}