const page = document.querySelector(`.page`);

const popups = page.querySelectorAll(`.popup`);
const formElements = page.querySelectorAll(`.form`);
const userName = page.querySelector(`.profile__name`);
const userJob = page.querySelector(`.profile__profession`);

const editProfileBtn = page.querySelector(`.profile__edit-button`);
const addPlaceBtn = page.querySelector(`.profile__add-button`);
const closeBtns = page.querySelectorAll(`.popup__close-button`);

const photoCardTemplate = page.querySelector(`#photo-card-template`).content;
const photoCards = page.querySelector(`.photo-cards__elements`);

console.log(popups)

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
  initialCards.forEach((item) => {
  addCard(item.name, item.link)
  });

  function addCard(cardName, cardImage) {
    const photoCard = photoCardTemplate.querySelector(`.photo-card`).cloneNode(true);
    photoCard.querySelector(`.photo-card__image`).src = cardImage;
    photoCard.querySelector(`.photo-card__image`).alt = cardName;
    photoCard.querySelector(`.photo-card__title`).textContent = cardName;
    photoCards.prepend(photoCard);

    const likeButton = photoCard.querySelector(`.photo-card__like-button`);
    likeButton.addEventListener('click', (evt)=> {
      evt.target.classList.toggle(`photo-card__like-button_active`);
    }); 
    const deleteButton = photoCard.querySelector(`.photo-card__delete-button`);
    deleteButton.addEventListener('click',(evt)=> {
      evt.target.parentElement.remove()
    });
    const photoCardImage = photoCard.querySelector(`.photo-card__image`);
    photoCardImage.addEventListener('click',(evt)=> {
      console.log(evt.target)
      console.log(evt.target.src)
      console.log(evt.target.alt)
      const popupImage = page.querySelector(`.popup__image`);
      const popupCaption = page.querySelector(`.popup__caption`);
      popupImage.src = evt.target.src;
      popupImage.alt = evt.target.alt;
      popupCaption.textContent = evt.target.alt;
      openPopup(2);

      closeBtns[2].addEventListener( 'click', ()=> closePopup(2) );
    });
  };

function openPopup(index){
  popups[index].classList.add(`popup_opened`);
};

function closePopup(index){
  popups[index].classList.remove(`popup_opened`);
};

function editProfile() {
  const inputName = page.querySelector(`input[name='user-name']`);
  const inputJob= page.querySelector(`input[name='user-profession']`); 
  inputName.value = userName.textContent;
  inputJob.value = userJob.textContent;
  openPopup(0);
  function submitProfileEdition (evt) {
    evt.preventDefault(); 
    const nameValue = inputName.value;
    const jobValue = inputJob.value;
  userName.textContent = nameValue;
  userJob.textContent = jobValue;
  popups[0].classList.remove(`popup_opened`);
    
  };
  closeBtns[0].addEventListener( 'click', ()=> closePopup(0) );
  formElements[0].addEventListener('submit', submitProfileEdition);
};

function addPlace() {
  const inputPlace = page.querySelector(`input[name='place-name']`);
  const inputLink= page.querySelector(`input[name='place-link']`); 
  openPopup(1)
  console.log(inputPlace.value)
  console.log(inputLink)

  function submitPlaceAdding (evt) {
    evt.preventDefault();
    const placeValue = inputPlace.value;
    const linkValue = inputLink.value;
    addCard(placeValue, linkValue);
    popups[1].classList.remove(`popup_opened`);
    evt.target.reset();
  };
 
  closeBtns[1].addEventListener( 'click', ()=> closePopup(1) );
  formElements[1].addEventListener('submit', submitPlaceAdding, {once:true});
}



editProfileBtn.addEventListener( 'click', ()=> editProfile() );
addPlaceBtn.addEventListener('click', ()=> addPlace() );

