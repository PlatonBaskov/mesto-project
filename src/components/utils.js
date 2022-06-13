import { getUserInfo, user } from './api.js'
import { userName, userJob } from './modale.js'

function renderUser(user){
  const userName = document.querySelector('.profile__name'),
     userJob = document.querySelector('.profile__profession'),
     userAvatar = document.querySelector('.profile__image');
  userName.textContent = user.name;
  userJob.textContent = user.about;
  userAvatar.src = user.avatar;  
}

function openPopup(popup) {
  popup.classList.add(`popup_opened`);
  popup.addEventListener('mousedown', closePopupWithMouse);
  document.addEventListener('keydown', closePopupWithEsc);
};
  
function closePopup(popup){
  popup.classList.remove(`popup_opened`);
  popup.removeEventListener('mousedown', closePopupWithMouse);
  document.removeEventListener('keydown', closePopupWithEsc);
};
  
function closePopupWithMouse(evt) {
  if(evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
};
  
function closePopupWithEsc(evt) {
  if(evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  };
};

export { openPopup, closePopup, renderUser};