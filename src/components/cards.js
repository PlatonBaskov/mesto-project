import { imagePopup } from './index.js'
import { openPopup } from './utils.js';


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

function createCards(cards) {
  cards.forEach((item) => {
  addCard(item.name, item.link);
});
};

function addCard(cardName, cardImage) {
  const photoCard = createCard(cardName, cardImage);
  photoCards.prepend(photoCard);
};

export {addCard, createCards};