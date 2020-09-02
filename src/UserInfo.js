export default class UserInfo{
  constructor(profileNameEl, profileJobEl){
    this._profileNameEl = profileNameEl;
    this._profileJobEl = profileJobEl;
    this._userInfo = {};
  }
  getUserInfo(){
    this._userInfo.profileName = this._profileNameEl.textContent;
    this._userInfo.profileJob = this._profileJobEl.textContent;
    return this._userInfo;
  }
  setUserInfo(formValues){
    this._profileNameEl.textContent = formValues.profileName;
    this._profileJobEl.textContent = formValues.profileJob;
  }
}