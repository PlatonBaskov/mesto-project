import { imagePopup } from './index.js'
import { openPopup } from './utils.js';
import { userName } from './modale.js';
import { loveTheCard, hateTheCard, kickCardFromServe } from './api.js';

const checkOwner = (likeElement) => likeElement.name === userName.textContent;

const photoCardTemplate = document.querySelector(`#photo-card-template`).content,
  photoCards = document.querySelector(`.photo-cards__elements`),
  popupImage = document.querySelector(`.popup__image`),
  popupCaption = document.querySelector(`.popup__caption`);

function createCard(card) {
  const cardElement = photoCardTemplate.querySelector(`.photo-card`).cloneNode(true),
   photoCardImage = cardElement.querySelector(`.photo-card__image`),
   photoCardName = cardElement.querySelector(`.photo-card__title`),
   likeButton = cardElement.querySelector(`.photo-card__like-button`),
   photoCardLikes = cardElement.querySelector(`.photo-card__likes`);

  photoCardImage.src = card.link;
  photoCardImage.alt = card.name;
  photoCardName.textContent = card.name;

  if(card.likes.length > 0 && card.likes.some(checkOwner)) {
    likeButton.classList.add('photo-card__like-button_active');
  }
  
  photoCardLikes.textContent = card.likes.length;
  
  likeButton.addEventListener('click', (evt)=> {
    if(evt.target.classList.contains(`photo-card__like-button_active`)) {
      evt.target.classList.remove(`photo-card__like-button_active`)
      hateTheCard(card._id, photoCardLikes)
      photoCardLikes.textContent = card.likes.length;
    } else {
      evt.target.classList.add(`photo-card__like-button_active`)
      loveTheCard(card._id, photoCardLikes)
      photoCardLikes.textContent = card.likes.length;
    }
  }); 
  
  const deleteButton = cardElement.querySelector(`.photo-card__delete-button`);
  if(card.owner.name === document.querySelector('.profile__name').textContent){
    deleteButton.classList.add('photo-card__delete-button_active')
  }
  deleteButton.addEventListener('click',(evt)=> {
    cardElement.remove();
    kickCardFromServe(card._id);
  });

  photoCardImage.addEventListener('click', (evt)=> {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
    openPopup(imagePopup);
  });
  return cardElement;
};

function addCard(card) {
  const photoCard = createCard(card);
  photoCards.prepend(photoCard);
};

function createCards(cards){
  cards.forEach((card) => {
  addCard(card);
    
});
}

function setLikesCounter(likesCount, photoCardLikes){
  photoCardLikes.textContent = likesCount;
}

export {addCard, createCards, setLikesCounter};