import { addCard, initialCards } from "./cards.js";
import { openPopup, closePopup } from "./utils.js";
import { enableValidation } from "./validate.js";
import { editProfile, submitProfileEdition, submitPlaceAdding } from "./modale.js";
import '../pages/index.css';

const page = document.querySelector(`.page`),
      profilePopup = page.querySelector(`.profile-popup`),
      addPlacePopup = page.querySelector(`.add-place-popup`),
      imagePopup = page.querySelector(`.image-popup`),
      editProfileForm = page.querySelector(`form[name='user-info']`),
      addPlaceForm = page.querySelector(`form[name='add-new-place']`),
      editProfileBtn = page.querySelector(`.profile__edit-button`),
      addPlaceBtn = page.querySelector(`.profile__add-button`),
      closeProfilePopupBtn = page.querySelector(`button[name='close-profile-popup']`),
      closeAddPopupBtn = page.querySelector(`button[name='close-add-popup']`),
      closeImagePopupBtn = page.querySelector(`button[name='close-image-popup']`);

export{ page, imagePopup, profilePopup, addPlacePopup };

initialCards.forEach((item) => {
  addCard(item.name, item.link);
});

editProfileBtn.addEventListener( 'click', ()=> editProfile());
addPlaceBtn.addEventListener('click', ()=> openPopup(addPlacePopup));
editProfileForm.addEventListener('submit', submitProfileEdition);
addPlaceForm.addEventListener(`submit`, submitPlaceAdding);
closeProfilePopupBtn.addEventListener( 'click', ()=> closePopup(profilePopup));
closeAddPopupBtn.addEventListener( 'click', ()=> closePopup(addPlacePopup));
closeImagePopupBtn.addEventListener( 'click', ()=> closePopup(imagePopup));

enableValidation({
  popupSelector:'.popup',
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__input-error_active'
}); 

