import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupTitle = this._popupElement.querySelector('.popup__caption');
    this._popupPhoto = this._popupElement.querySelector('.popup__image');
  }

  open(title, link) {
    super.open();
    this._popupTitle.textContent = title;
    this._popupPhoto.src = link;
    this._popupPhoto.alt = `${title}`;
  }
}
