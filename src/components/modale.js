import { profilePopup, addPlacePopup } from "./index.js";
import { openPopup, closePopup } from "./utils.js";
import { addCard } from "./cards.js";

const inputName = document.querySelector(`input[name='user-name']`),
      inputJob= document.querySelector(`input[name='user-profession']`), 
      userName = document.querySelector(`.profile__name`),
      userJob = document.querySelector(`.profile__profession`),
      inputPlace = document.querySelector(`input[name='place-name']`),
      inputLink= document.querySelector(`input[name='place-link']`);

function editProfile() {
  inputName.value = userName.textContent;
  inputJob.value = userJob.textContent;
  openPopup(profilePopup)
};
  
function submitProfileEdition (evt) {
  evt.preventDefault(); 
  const nameValue = inputName.value,
        jobValue = inputJob.value;
  userName.textContent = nameValue;
  userJob.textContent = jobValue;
  profilePopup.removeEventListener('submit', submitProfileEdition);
  closePopup(profilePopup)
};
  
function submitPlaceAdding (evt) {
  evt.preventDefault();
  const placeValue = inputPlace.value,
        linkValue = inputLink.value;
  addCard(placeValue, linkValue);
  closePopup(addPlacePopup)
  evt.target.reset();
};

export { editProfile, submitProfileEdition, submitPlaceAdding };