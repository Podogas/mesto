export default class Api{
  constructor(config){
    this._url = config.baseUrl;
    this._headers = config.headers;
  }
_checkResponse(res){
  if(res.ok){
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
}
/*
метод для получения массива всех карточек с сервера
 */
getInitialCards(){
  return fetch(` ${this._url}/cards`,{
    headers: this._headers,
    method: 'GET'}
    )
    .then(res => 
      this._checkResponse(res)
    )
    .catch((err) => {
      console.error(`УСЁ ПОГАНО - ${err}`);
    });
};

/*
метод для получения информации о пользователе с сервера
 */
getUserInfo(){
  return fetch(` ${this._url}/users/me`,{
    headers: this._headers,
    method: 'GET'}
    )
    .then(res => 
      this._checkResponse(res)
    )
    .catch((err) => {
      console.error(`УСЁ ПОГАНО - ${err}`);
    });

};
getPageData(){
  return Promise.all([this.getUserInfo(), this.getInitialCards()])
}
patchUserInfo(dataToPatch){
  return fetch(` ${this._url}/users/me`, {
    headers: this._headers,
    method: 'PATCH',
    body: JSON.stringify({
      name: dataToPatch.name,
      about: dataToPatch.about
    })}
  )
  .then(res => 
      this._checkResponse(res)
    )
    .catch((err) => {
      console.error(`УСЁ ПОГАНО - ${err}`);
    });
};
postNewCard(dataToPost){
  return fetch(`${this._url}/cards`, {
    headers: this._headers,
    method: 'POST',
    body: JSON.stringify({
      name: dataToPost.name,
      link: dataToPost.link
    })}
  )
  .then(res => 
      this._checkResponse(res)
    )
    .catch((err) => {
      console.error(`УСЁ ПОГАНО - ${err}`);
    });
};
deleteCard(cardId){
  return fetch(`${this._url}/cards/${cardId}`, {
    headers: this._headers,
    method: 'DELETE',
    }
  )
  .then(res => 
      this._checkResponse(res)
    )
    .catch((err) => {
      console.error(`УСЁ ПОГАНО - ${err}`);
    });
};
like(cardId, method){
  return fetch(`${this._url}/cards/likes/${cardId}`, {
    headers: this._headers,
    method: method,
    }
  )
  .then(res => 
      this._checkResponse(res)
    )
    .catch((err) => {
      console.error(`УСЁ ПОГАНО - ${err}`);
    });
};  
patchAvatar(url){
  console.log(url)
  return fetch(`${this._url}/users/me/avatar`, {
    headers: this._headers,
    method: 'PATCH',
    body: JSON.stringify({avatar:url})
    }
  )
  .then(res => 
      this._checkResponse(res)
    )
    .catch((err) => {
      console.error(`УСЁ ПОГАНО - ${err}`);
    });  
}

};



