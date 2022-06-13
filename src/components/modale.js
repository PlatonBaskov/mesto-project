import { profilePopup, addPlacePopup, avatarPopup, userId } from "./index.js";
import { openPopup, closePopup, renderUser } from "./utils.js";
import { changeProfileData, postCardOnServe, changeUserAvatar } from "./api.js";
import { addCard } from "./cards.js";

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
  renderLoading(true, submitButton)
  changeProfileData(nameValue, jobValue)
  .then((newUserData)=>{
    renderUser(newUserData)
    closePopup(profilePopup)
    submitButton.classList.add('form__submit-button_inactive');
    submitButton.setAttribute('disabled', true);
  })
  .finally( () => {
     renderLoading(false, submitButton) 
    })
  .catch((err)=>{
    console.log(err)
  })
};

function submitPlaceAdding (evt) {
  evt.preventDefault();
  const placeValue = inputPlace.value,
        submitButton = evt.target.querySelector('.form__submit-button'),
        linkValue = inputLink.value;
  renderLoading(true, submitButton)      
  postCardOnServe(placeValue, linkValue)
  .then((card)=>{
    addCard(card, userId)
    closePopup(addPlacePopup)
    evt.target.reset();
    submitButton.classList.add('form__submit-button_inactive');
    submitButton.setAttribute('disabled', true);
  })
  .finally( () => {
    renderLoading(false, submitButton) 
   })
  .catch((err)=>{
    console.log(err)
  })
};

function submitAvatarChange(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.form__submit-button'),
  avatarLinkValue = avatarLink.value;
  renderLoading(true, submitButton)
  changeUserAvatar(avatarLinkValue)
  .then((newUserAvatar)=>{
    renderUser(newUserAvatar)
    closePopup(avatarPopup)
    evt.target.reset();
    submitButton.classList.add('form__submit-button_inactive');
    submitButton.setAttribute('disabled', true);
  })
  .finally( () => {
    renderLoading(false, submitButton) 
   })
  .catch((err)=>{
    console.log(err)
  })
}

function renderLoading(isLoading, submitButton){
  if(isLoading){
   submitButton.value = "Сохранение..."
    } else {
    submitButton.value = "Сохранить"
  }
}


export { editProfile, submitProfileEdition, submitPlaceAdding, submitAvatarChange, renderLoading, userName, userJob};