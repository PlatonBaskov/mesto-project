const page = document.querySelector(`.page`);
const profilePopup = page.querySelector(`.profile-popup`);
const addPlacePopup = page.querySelector(`.add-place-popup`);
const imagePopup = page.querySelector(`.image-popup`);
const editProfileForm = page.querySelector(`form[name='user-info']`);
const addPlaceForm = page.querySelector(`form[name='add-new-place']`);
const inputName = page.querySelector(`input[name='user-name']`);
const inputJob= page.querySelector(`input[name='user-profession']`); 
const userName = page.querySelector(`.profile__name`);
const userJob = page.querySelector(`.profile__profession`);
const editProfileBtn = page.querySelector(`.profile__edit-button`);
const addPlaceBtn = page.querySelector(`.profile__add-button`);
const closeBtns = page.querySelectorAll(`.popup__close-button`);
const closeProfilePopupBtn = page.querySelector(`button[name='close-profile-popup']`)
const closeAddPopupBtn = page.querySelector(`button[name='close-add-popup']`)
const closeImagePopupBtn = page.querySelector(`button[name='close-image-popup']`)
const inputPlace = page.querySelector(`input[name='place-name']`);
const inputLink= page.querySelector(`input[name='place-link']`); 
const photoCardTemplate = page.querySelector(`#photo-card-template`).content;
const photoCards = page.querySelector(`.photo-cards__elements`);
const popupImage = page.querySelector(`.popup__image`);
const popupCaption = page.querySelector(`.popup__caption`);


/*------ Массив стартовых объектов галереи -------- */
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

initialCards.forEach((item) => {
  addCard(item.name, item.link);
});

function openPopup(popup){
  popup.classList.add(`popup_opened`);
};

function closePopup(popup){
  popup.classList.remove(`popup_opened`);
};

function editProfile() {
  inputName.value = userName.textContent;
  inputJob.value = userJob.textContent;
  openPopup(profilePopup)
};

function submitProfileEdition (evt) {
  evt.preventDefault(); 
  const nameValue = inputName.value;
  const jobValue = inputJob.value;
  userName.textContent = nameValue;
  userJob.textContent = jobValue;
  closePopup(profilePopup)
};

function submitPlaceAdding (evt) {
  evt.preventDefault();
  const placeValue = inputPlace.value;
  const linkValue = inputLink.value;
  addCard(placeValue, linkValue);
  closePopup(addPlacePopup)
  evt.target.reset();
};

editProfileBtn.addEventListener( 'click', ()=> editProfile());
addPlaceBtn.addEventListener('click', ()=> openPopup(addPlacePopup));
editProfileForm.addEventListener('submit', submitProfileEdition);
addPlaceForm.addEventListener(`submit`, submitPlaceAdding);
closeProfilePopupBtn.addEventListener( 'click', ()=> closePopup(profilePopup));
closeAddPopupBtn.addEventListener( 'click', ()=> closePopup(addPlacePopup));
closeImagePopupBtn.addEventListener( 'click', ()=> closePopup(imagePopup));

