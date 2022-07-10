
import { checkResponse } from '../utils/utils.js'

export default class Api {
  //конструктор
  constructor({ baseUrl, headers }){
    this._baseUrl = baseUrl;
    this._userLink = `${this._baseUrl}/users/me`;
    this._cardsLink = `${this._baseUrl}/cards`;
    this._likesLink = `${this._baseUrl}/cards/likes`;
    this._authorization = headers['authorization']
  }
  //получение инфы о юзере
  getUserInfo() {
    return fetch(this._userLink, {
      headers: {
        authorization: this._authorization,
      }
    })
    .then(checkResponse)
  }
  //патчим инфу о юзере на серв
  changeProfileData({ name, about }) {
    return fetch(this._userLink, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          name: name,
          about: about,
        })
    })
    .then(checkResponse)
  }
  //меняем аву
  changeUserAvatar(src) {
    return fetch(`${this._userLink}/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: src.link
      })
    })
  .then(checkResponse)
  }
  //получаем фотки с сервера
  getInitialCards() {
    return fetch(this._cardsLink, {
      headers: {
        authorization: this._authorization
      }
     })
  .then(checkResponse)
  }
  //постим фотку на сервак
  postCardOnServe({ name, link
  }) {
    return fetch(`${this._cardsLink}`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(checkResponse)
  }
  //кикаем фотку с сервера
  kickCardFromServe(cardID) {
    return fetch(`${this._cardsLink}/${cardID}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
      }
    })
  }
  //лайкаем фотку на сервере
  loveTheCard(cardID) {
    return fetch(`${this._likesLink}/${cardID}`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
      }
    })
   .then(checkResponse)
  }
  //хейтим фотку на сервере
  hateTheCard = (cardID)=>{
    return  fetch(`${this._likesLink}/${cardID}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
      }
    })
    .then(checkResponse)
  }
  
};
