import { createCards, addCard, setLikesCounter } from './cards.js'
import { renderUser } from './utils.js'
import { renderLoading } from './modale.js'


const getUserInfo = () => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-11/users/me', {
  headers: {
    authorization: 'd04fa384-542f-4f76-a0e6-73d54ad20363'
  }
})
  .then((res) => {
    if(res.ok){
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  })
  .then((result) => {
    const user = result;
    renderUser(user);
  })
  .catch((err)=>{
    console.log(err)
  })
}

const getInitialCards = ()=> {
    return fetch('https://nomoreparties.co/v1/plus-cohort-11/cards', {
  headers: {
    authorization: 'd04fa384-542f-4f76-a0e6-73d54ad20363'
  }
})
  .then((res) => {
    if(res.ok){
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  })
  .then((result) => {
    const cards = result;
    createCards(cards)
  })
  .catch((err)=>{
    console.log(err)
  })

}

const changeProfileData = (newName, newJob)=> {
  fetch('https://nomoreparties.co/v1/plus-cohort-11/users/me', {
  method: 'PATCH',
  headers: {
    authorization: 'd04fa384-542f-4f76-a0e6-73d54ad20363',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: `${newName}`,
    about: `${newJob}`
  })
})
  .then((res) => {
    if(res.ok){
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  })
  .then((newUserData)=>{
    renderUser(newUserData)
  })
  .finally( () => {
     renderLoading(false) 
    })
  .catch((err)=>{
    console.log(err)
  })
}

const changeUserAvatar = (avatarLink)=> {
  fetch('https://nomoreparties.co/v1/plus-cohort-11/users/me/avatar', {
  method: 'PATCH',
  headers: {
    authorization: 'd04fa384-542f-4f76-a0e6-73d54ad20363',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    avatar: `${avatarLink}`
  })
})
  .then((res) => {
    if(res.ok){
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  })
  .then((newUserAvatar)=>{
    renderUser(newUserAvatar)
  })
  .finally( () => {
    renderLoading(false) 
   })
  .catch((err)=>{
    console.log(err)
  })
}

const postCardOnServe = (cardName, cardLink) => {
  fetch('https://nomoreparties.co/v1/plus-cohort-11/cards', {
  method: 'POST',
  headers: {
    authorization: 'd04fa384-542f-4f76-a0e6-73d54ad20363',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: `${cardName}`,
    link: `${cardLink}`
  })
})
  .then((res) => {
    if(res.ok){
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  })
  .then((card)=>{
    addCard(card)
  })
  .finally( () => {
    renderLoading(false) 
   })
  .catch((err)=>{
    console.log(err)
  })
}

const  kickCardFromServe = (cardID) => {
  fetch(`https://nomoreparties.co/v1/plus-cohort-11/cards/${cardID}`, {
  method: 'DELETE',
  headers: {
    authorization: 'd04fa384-542f-4f76-a0e6-73d54ad20363',
    'Content-Type': 'application/json'
  }
})
}

const loveTheCard = (cardID, photoCardLikes)=>{
  fetch(`https://nomoreparties.co/v1/plus-cohort-11/cards/likes/${cardID}`, {
  method: 'PUT',
  headers: {
    authorization: 'd04fa384-542f-4f76-a0e6-73d54ad20363',
    'Content-Type': 'application/json'
  }
})
.then((res) => {
    if(res.ok){
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  })
.then((data)=>{
    setLikesCounter(data.likes.length, photoCardLikes)
  })
  .catch((err)=>{
    console.log(err)
  })
}
const hateTheCard = (cardID, photoCardLikes)=>{
    fetch(`https://nomoreparties.co/v1/plus-cohort-11/cards/likes/${cardID}`, {
  method: 'DELETE',
  headers: {
    authorization: 'd04fa384-542f-4f76-a0e6-73d54ad20363',
    'Content-Type': 'application/json'
  }
})
  .then((res) => {
    if(res.ok){
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  })
.then((data)=>{
    setLikesCounter(data.likes.length, photoCardLikes)  
  })
  .catch((err)=>{
    console.log(err)
  })
}


export { getUserInfo, getInitialCards, changeProfileData, postCardOnServe, kickCardFromServe, loveTheCard, hateTheCard, changeUserAvatar }