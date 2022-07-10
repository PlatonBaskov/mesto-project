import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._popupForm = this._popupElement.querySelector('.form');
    this._inputList = Array.from(this._popupElement.querySelectorAll('.form__item'));
    this._button = this._popupForm.querySelector('.form__submit-button');
    this._textButton = this._button.textContent;
  }

  close() {
    super.close();
    this._popupForm.reset();
  }


  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
      
    });

    return this._formValues;
  }

  renderSaving(status){
    if(status){
      this._button.textContent = `Cохранение...`;
    } else {
      this._button.textContent = this._textButton;
    }
  }


  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  }
}
