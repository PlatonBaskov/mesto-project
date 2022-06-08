import {createUser} from './modale.js'
import {createCards} from './cards.js'

function getUserInfo(){
  return fetch('https://nomoreparties.co/v1/plus-cohort-11/users/me', {
  headers: {
    authorization: 'd04fa384-542f-4f76-a0e6-73d54ad20363'
  }
})
  .then(res => res.json())
  .then((result) => {
    const data = result;
    createUser(data)
  });
};

function getInitialCards(){
  return fetch('https://nomoreparties.co/v1/plus-cohort-11/cards', {
headers: {
  authorization: 'd04fa384-542f-4f76-a0e6-73d54ad20363'
}
})
.then(res => res.json())
.then((result) => {
  const data = result;
  createCards(data)
});
}

function changeProfileData(newName, newJob){
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
}); 
}

export { getUserInfo, getInitialCards, changeProfileData }