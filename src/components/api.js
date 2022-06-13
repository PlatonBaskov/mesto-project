const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-11',
  headers: {
    authorization: 'd04fa384-542f-4f76-a0e6-73d54ad20363',
    'Content-Type': 'application/json',
  },
};

function checkResponse(res){
  if(res.ok){
    return res.json()
  } else {
    return Promise.reject(`Ошибка: ${res.status}`)
  }
}

const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
  headers: config.headers
})
  .then(checkResponse)
}

const getInitialCards = ()=> {
    return fetch(`${config.baseUrl}/cards`, {
  headers: config.headers
})
  .then(checkResponse)
}

const changeProfileData = (newName, newJob) => {
  return fetch(`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    name: `${newName}`,
    about: `${newJob}`
  })
})
  .then(checkResponse)
}

const changeUserAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    avatar: `${avatarLink}`
  })
})
  .then(checkResponse)
}

const postCardOnServe = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
  method: 'POST',
  headers: config.headers,
  body: JSON.stringify({
    name: `${cardName}`,
    link: `${cardLink}`
  })
})
.then(checkResponse)
}

const  kickCardFromServe = (cardID) => {
  return fetch(`${config.baseUrl}/cards/${cardID}`, {
  method: 'DELETE',
  headers: config.headers
})
}

const loveTheCard = (cardID)=>{
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
  method: 'PUT',
  headers: config.headers
})
.then(checkResponse)
}

const hateTheCard = (cardID)=>{
  return  fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
  method: 'DELETE',
  headers: config.headers
})

.then(checkResponse)
}


export { getUserInfo, getInitialCards, changeProfileData, postCardOnServe, kickCardFromServe, loveTheCard, hateTheCard, changeUserAvatar }