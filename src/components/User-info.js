export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement =  document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return this._profileData = {
      name: this._nameElement.textContent,
      about: this._jobElement.textContent,
    };
  }

  setUserInfo( { name, about, avatar } ) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = about;
    console.log(this._avatarElement)
    this._avatarElement.src = avatar;
  }
}
