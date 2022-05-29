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
/*валидация запускается после открытия попапа*/ 
  enableValidation({
  popupSelector:'.popup_opened',
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__input-error_active'
}); 
/*запускаем "ручки" для закрытия попапа кнопкой*/
  popup.addEventListener('click', closePopupWithMouse)
  document.addEventListener('keydown', closePopupWithEsc)
};

function closePopup(popup){
  popup.classList.remove(`popup_opened`);
}

function closePopupWithMouse(evt) {
 
  if(evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
  evt.target.removeEventListener('click', closePopupWithMouse);
};

function closePopupWithEsc(evt) {

  if(evt.key === 'Escape'){
  closePopup(document.querySelector('.popup_opened'));
}

  document.removeEventListener('keydown', closePopupWithEsc);
};

function enableValidation(settings) {

const popupElement = document.querySelector(settings.popupSelector) 
const form = popupElement.querySelector(settings.formSelector)
console.log(popupElement)
console.log('Запуск валидации')
console.log(form)
if(form !== null) {
  setEventListeners(popupElement, form, settings)
  console.log('Пройдена проверка, что форма не пуста')
  }
}

function setEventListeners(popupElement, formElement, settings) {
  console.log('запущена установка слушателей событий')
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const submitButton = formElement.querySelector(settings.submitButtonSelector);
  console.log('Первая проверка состояния кнопки')
  toggleSubmitButton(inputList, submitButton, settings);
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settings);
      console.log('Установка слушателей на каждый инпут')
      toggleSubmitButton(inputList, submitButton, settings);
    });
  });
  
};

function checkInputValidity(formElement, inputElement, settings) {
console.log('Проверка валидности поля')
  if (!inputElement.validity.valid) {
console.log('Невалидно')
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
console.log('валидно')
    hideInputError(formElement, inputElement, settings);
  }
};

function hasInvalidInput(inputList){
console.log('Проверка валидности всех полей одновременно')
  return inputList.some((inputItem) => {
    return !inputItem.validity.valid;
  });
};

function toggleSubmitButton(inputList, buttonElement, settings){
  if(hasInvalidInput(inputList)){
console.log('одно из полей невалидно')
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
console.log('все поля валидны')
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  };
};


function showInputError(formElement, inputElement, errorMessage, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  console.log(`показать ошибку для ${errorElement}`)
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  console.log(`убрать ошибку для ${errorElement}`)
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
  
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
  profilePopup.removeEventListener('submit', submitProfileEdition)
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

console.log(editProfileForm)


