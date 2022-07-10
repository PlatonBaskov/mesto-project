
export default class Card {
  //конструктор
  constructor({ data, handleCardClick, handleKickClick, handleLikeClick }, templateSelector, userId){
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleKickClick = handleKickClick;
    this._handleLikeClick = handleLikeClick;
    this._userId = userId;
  }
  //получаем разметку шаблона карточи
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector(`.photo-card`).cloneNode(true);
    return cardElement;
  }
  //собираем карточку
  generate() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(`.photo-card__image`)
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(`.photo-card__title`).textContent = this._name;
    this._deleteButton = this._element.querySelector(`.photo-card__delete-button`)
    this._likeButton = this._element.querySelector(`.photo-card__like-button`)
    
    //кнопка удаления активируется только для своих карточек
    if(this._userId === this._ownerId) {
      this._deleteButton.classList.add('photo-card__delete-button_active');
    }   
    //ставим счетчик лайков и слушатели
    this.setLikes(this._likes);
    this._setEventListeners();
   
    return this._element;
  }
  //удаление своей карточки по кнопке
  removeCard() {
    this._element.remove();
    this._element = null;
  }
  //проверка чей лайк
  _checkLike() {
    return this._likes.some( (like) => { return like._id === this._userId;} )
  }
  //обновляем данные по лайкам
  setLikes(arr) {
    this._element.querySelector('.photo-card__likes').textContent = arr.length;
    this._likes = arr;
    if (this._checkLike()) {
      this._likeButton.classList.add('photo-card__like-button_active');
    } else {
      this._likeButton.classList.remove('photo-card__like-button_active');
    }
  }
  //ставим слушатели клика
  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
    this._deleteButton.addEventListener('click', () => {
      this._handleKickClick(this._cardId, this);
    });
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._cardId, this._checkLike(), this);
    }); 
  }
};

