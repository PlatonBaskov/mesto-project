import { profilePopup, addPlacePopup, avatarPopup } from "./index.js";
import { openPopup, closePopup } from "./utils.js";
import { changeProfileData, postCardOnServe, changeUserAvatar } from "./api.js";

const inputName = document.querySelector(`input[name='user-name']`),
      inputJob= document.querySelector(`input[name='user-profession']`), 
      userName = document.querySelector(`.profile__name`),
      userJob = document.querySelector(`.profile__profession`),
      inputPlace = document.querySelector(`input[name='place-name']`),
      avatarLink = document.querySelector(`input[name='avatar-link']`),
      inputLink= document.querySelector(`input[name='place-link']`);

function editProfile() {
  inputName.value = userName.textContent;
  inputJob.value = userJob.textContent;
  openPopup(profilePopup)
};
  
function submitProfileEdition (evt) {
  evt.preventDefault(); 
  const nameValue = inputName.value,
         submitButton = evt.target.querySelector('.form__submit-button'),
        jobValue = inputJob.value;
  renderLoading(true)
  changeProfileData(nameValue, jobValue)
  closePopup(profilePopup)
  submitButton.classList.add('form__submit-button_inactive');
  submitButton.setAttribute('disabled', true);
};

function submitPlaceAdding (evt) {
  evt.preventDefault();
  const placeValue = inputPlace.value,
        submitButton = evt.target.querySelector('.form__submit-button'),
        linkValue = inputLink.value;
  renderLoading(true)      
  postCardOnServe(placeValue, linkValue)
  closePopup(addPlacePopup)
  evt.target.reset();
  submitButton.classList.add('form__submit-button_inactive');
  submitButton.setAttribute('disabled', true);
};

function submitAvatarChange(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.form__submit-button'),
  avatarLinkValue = avatarLink.value;
  renderLoading(true)
  changeUserAvatar(avatarLinkValue);
  closePopup(avatarPopup)
  evt.target.reset();
  submitButton.classList.add('form__submit-button_inactive');
  submitButton.setAttribute('disabled', true);
}

function renderLoading(isLoading){
  if(isLoading){
    const submitBtns = Array.from(document.querySelectorAll('.form__submit-button'))
    submitBtns.forEach((item)=>{
      item.value = 'Сохранение...'
      if(item.parentNode.name == 'add-new-place'){
        item.value = 'Создание..'
      }
    })
  } else {
    const submitBtns = Array.from(document.querySelectorAll('.form__submit-button'))
    submitBtns.forEach((item)=>{
      item.value = 'Сохранить'
      if(item.parentNode.name == 'add-new-place'){
        item.value = 'Создать'
      }
    })
  }
  }


export { editProfile, submitProfileEdition, submitPlaceAdding, submitAvatarChange, renderLoading, userName, userJob};