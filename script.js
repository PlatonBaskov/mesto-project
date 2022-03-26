const page = document.querySelector(`.page`);
const formElement = page.querySelector(`.form`);
const editButton = page.querySelector(`.profile__edit-button`);
const popupEditProfile = page.querySelector(`.popup`);
const popupCloseButton = page.querySelector(`.popup__close-button`);
const saveButton = page.querySelector(`.form__submit-button`);
const userName = page.querySelector(`.profile__name`);
const userJob = page.querySelector(`.profile__profession`);
const inputName = page.querySelector(`input[name='user-name']`);
const inputJob= page.querySelector(`input[name='user-profession']`); 
console.log(formElement);
console.log(inputName);
console.log(inputJob);

function openProfileEditor() {
  inputName.value = userName.textContent;
  inputJob.value = userJob.textContent;
  popupEditProfile.classList.add(`popup_opened`);
  console.log('forma otkrita');
}

function closeProfileEditor() {
  popupEditProfile.classList.remove(`popup_opened`);
  console.log('forma zakrita');
}


function formSubmitHandler (evt) {
  evt.preventDefault(); 
  const nameValue = inputName.value;
  const jobValue = inputJob.value;
  if (nameValue === '' || jobValue === '') {
      alert('Необходимо заполнить поля перед сохранением профиля!')
  } else {
userName.textContent = nameValue;
userJob.textContent = jobValue;
popupEditProfile.classList.remove(`popup_opened`);
  }
};

function likeMeOrNot() {
    likeButton.classList.toggle('photo-card__like-button_active');
}

/*
saveButton.addEventListener('click', function() {

    userName.textContent = inputName.value;
    userJob.textContent = inputJob.value;
    console.log(userName.textContent);
    console.log('test');
    popupEditProfile.classList.remove(`popup_opened`);
});
*/
editButton.addEventListener('click', openProfileEditor);
popupCloseButton.addEventListener('click', closeProfileEditor);
formElement.addEventListener('submit', formSubmitHandler);
