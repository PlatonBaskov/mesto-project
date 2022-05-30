function openPopup(popup) {
  popup.classList.add(`popup_opened`);
  popup.addEventListener('click', closePopupWithMouse);
  document.addEventListener('keydown', closePopupWithEsc);
};
  
function closePopup(popup){
  popup.classList.remove(`popup_opened`);
};
  
function closePopupWithMouse(evt) {
  if(evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
  evt.target.removeEventListener('click', closePopupWithMouse);
};
  
function closePopupWithEsc(evt) {
  if(evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  };
  document.removeEventListener('keydown', closePopupWithEsc);
};

export { openPopup, closePopup };