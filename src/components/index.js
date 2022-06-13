import { createCards } from "./cards.js";
import { openPopup, closePopup, renderUser } from "./utils.js";
import { enableValidation } from "./validate.js";
import { editProfile, submitProfileEdition, submitPlaceAdding, submitAvatarChange } from "./modale.js";
import { getUserInfo, getInitialCards } from "./api.js";
import '../pages/index.css';

let userId;

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
      closeImagePopupBtn = page.querySelector(`button[name='close-image-popup']`),
      avatarPopup = page.querySelector(`.avatar-popup`),
      submitAvatarChangeButton = page.querySelector(`form[name='user-avatar']`),
      changeAvatarButton = page.querySelector(`.profile__image-overlay`),
      closePopupBtns = Array.from(page.querySelectorAll(`.popup__close-button`));

editProfileBtn.addEventListener( 'click', ()=> editProfile());
addPlaceBtn.addEventListener('click', ()=> openPopup(addPlacePopup));
changeAvatarButton.addEventListener('click', () => openPopup(avatarPopup));
editProfileForm.addEventListener('submit', submitProfileEdition);
addPlaceForm.addEventListener(`submit`, submitPlaceAdding);
submitAvatarChangeButton.addEventListener(`submit`, submitAvatarChange)

closePopupBtns.forEach( (btn) => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup));
});

getUserInfo()
.then((result) => {
  const user = result
  userId = user._id;
  renderUser(user)
})

.catch((err)=>{
  console.log(err)
})

getInitialCards()
.then((result) => {
  const cards = result;
  createCards(cards, userId)
})
.catch((err)=>{
  console.log(err)
})

enableValidation({
  popupSelector:'.popup',
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__input-error_active'
}); 

export { imagePopup, profilePopup, addPlacePopup, avatarPopup, userId }