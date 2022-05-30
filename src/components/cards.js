import { imagePopup } from './index.js'
import { openPopup } from './utils.js';

const initialCards = [
  {
    name: 'Санкт-Петербург',
    link: 'https://images.pexels.com/photos/1606876/pexels-photo-1606876.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  },
  {
    name: 'Выборг',
    link: 'https://images.pexels.com/photos/8994594/pexels-photo-8994594.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];
/*------ Массив стартовых объектов галереи -------- */
const photoCardTemplate = document.querySelector(`#photo-card-template`).content;
const photoCards = document.querySelector(`.photo-cards__elements`);
const popupImage = document.querySelector(`.popup__image`);
const popupCaption = document.querySelector(`.popup__caption`);

function createCard(cardName, cardImage) {

  const cardElement = photoCardTemplate.querySelector(`.photo-card`).cloneNode(true);
  const photoCardImage = cardElement.querySelector(`.photo-card__image`);
  const photoCardName = cardElement.querySelector(`.photo-card__title`)
  photoCardImage.src = cardImage;
  photoCardImage.alt = cardName;
  photoCardName.textContent = cardName;

  const likeButton = cardElement.querySelector(`.photo-card__like-button`);
  likeButton.addEventListener('click', (evt)=> {
    evt.target.classList.toggle(`photo-card__like-button_active`);
  }); 

  const deleteButton = cardElement.querySelector(`.photo-card__delete-button`);
  deleteButton.addEventListener('click',(evt)=> {
    cardElement.remove();
  });

  photoCardImage.addEventListener('click', (evt)=> {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
    openPopup(imagePopup);
  });

  return cardElement;
};

function addCard(cardName, cardImage) {
  const photoCard = createCard(cardName, cardImage);
  photoCards.prepend(photoCard);
};

export {addCard, initialCards};