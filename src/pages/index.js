// Импорты -------------------------------------------------

import './index.css';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/popup-with-image.js';
import PopupWithForm from '../components/popup-with-form.js';
import UserInfo from '../components/user-info.js';

import {
  page,
  validationObject,
  selectorObj,
  editProfileBtn,
  addPlaceBtn,
  profilePopup,
  profilePopupInputs,
  changeAvatarButton
  } from '../utils/constants.js'


//Функции--------------------------------------------------------

function handleCardClick(title, link) {
  popupWithImage.open(title, link);
}

function handleKickClick(id, card) {
  api.kickCardFromServe(id)
    .then( () => {
      card.removeCard();
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleLikeClick(id, isLiked, card) {
  if (isLiked) {
    api.hateTheCard(id)
      .then( (data) => {
        card.setLikes(data.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api.loveTheCard(id)
      .then( (data) => {
        card.setLikes(data.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function createCard(dataCard, id) {
  const card = new Card({
      data: dataCard,
      handleCardClick,
      handleKickClick,
      handleLikeClick,
    },
    selectorObj.cardTemplateId,
    id);

  const newCard = card.generate();

  return newCard;
}



function handleProfilePopup(inputsData) {
  popupWithProfileForm.renderSaving(true);

  api.changeProfileData(inputsData)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupWithProfileForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithProfileForm.renderSaving(false);
    })
}

function handleAddCardPopup(inputsData) {
  popupWithAddCardForm.renderSaving(true);

  api.postCardOnServe(inputsData)
    .then((data) => {
      cardList.addItemPrepend(createCard(data, data.owner._id));
      popupWithAddCardForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithAddCardForm.renderSaving(false);
    })
}

function handleTextInput() {
  const userData = userInfo.getUserInfo();
  profilePopupInputs.forEach(input => {
    input.value = userData[input.name];
  });
}

function handlePopupChangeAvatar(inputsData) {
  popupWithChangeAvatarForm.renderSaving(true);

  api.changeUserAvatar(inputsData)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupWithChangeAvatarForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithChangeAvatarForm.renderSaving(false);
    })
}
// слушатели -------------------------------------------------------------------------------------------------------

editProfileBtn.addEventListener('click', () => {
  popupWithProfileForm.open();
  handleTextInput();
  validProfileForm.resetValidationState();
});

addPlaceBtn.addEventListener('click', () => {
  popupWithAddCardForm.open();
  validAddCardForm.resetValidationState();
});


changeAvatarButton.addEventListener('click', () => {
  popupWithChangeAvatarForm.open();
  validChangeAvatarForm.resetValidationState();
});

// Экземпляры классов ----------------------------------------------------------------------------------------------

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-11',
  headers: {
    authorization: 'd04fa384-542f-4f76-a0e6-73d54ad20363',
    'Content-Type': 'application/json'
  }
});

Promise.all([
    api.getUserInfo(),
    api.getInitialCards()
  ])
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo(userData)
    cardList.renderItems(cardsData, userData._id);
  })
  .catch((err) => {
    console.log(err);
  });

const cardList = new Section({
        renderer: (cardItem, id) => {
          cardList.addItem(createCard(cardItem, id));
        },
       },
  selectorObj.cardElementsSelector
);

const popupWithProfileForm = new PopupWithForm(selectorObj.popupProfileSelector, handleProfilePopup);
popupWithProfileForm.setEventListeners();

const popupWithImage = new PopupWithImage(selectorObj.popupImageSelector);
popupWithImage.setEventListeners();

const popupWithAddCardForm = new PopupWithForm(selectorObj.popupAddCardSelector, handleAddCardPopup);
popupWithAddCardForm.setEventListeners();

const popupWithChangeAvatarForm = new PopupWithForm(selectorObj.popupChangeAvatarSelector, handlePopupChangeAvatar);
popupWithChangeAvatarForm.setEventListeners();

const validAddCardForm = new FormValidator(validationObject, selectorObj.popupAddCardSelector);
validAddCardForm.enableValidation();

const validProfileForm = new FormValidator(validationObject, selectorObj.popupProfileSelector);
validProfileForm.enableValidation();

const validChangeAvatarForm = new FormValidator(validationObject, selectorObj.popupChangeAvatarSelector);
validChangeAvatarForm.enableValidation();

const userInfo = new UserInfo({
  nameSelector: selectorObj.profileNameSelector,
  jobSelector: selectorObj.profileJobSelector,
  avatarSelector: selectorObj.avatarSelector,
});



