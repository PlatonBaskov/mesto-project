
const validationObject = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__input-error_active',
};



const selectorObj = {
  popupImageSelector: '.image-popup',
  popupProfileSelector: '.profile-popup',
  popupAddCardSelector: '.add-place-popup',
  popupChangeAvatarSelector: '.avatar-popup',
  cardElementsSelector: '.photo-cards__elements',
  profileNameSelector: '.profile__name',
  profileJobSelector: '.profile__profession',
  cardTemplateId: '#photo-card-template',
  deleteCard: '.photo-card__delete-button',
  avatarSelector:'.profile__image',
};



const page = document.querySelector(`.page`),
      editProfileBtn = page.querySelector(`.profile__edit-button`),
      addPlaceBtn = page.querySelector(`.profile__add-button`),
      changeAvatarButton = page.querySelector(`.profile__image-overlay`),
      profilePopup = page.querySelector(`.profile-popup`),
      profilePopupInputs = profilePopup.querySelectorAll('input[type="text"]');


export {
  page,
  validationObject,
  selectorObj,
  editProfileBtn,
  addPlaceBtn,
  profilePopup,
  profilePopupInputs,
  changeAvatarButton
};
