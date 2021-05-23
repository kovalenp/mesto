export default class UserInfo {
  constructor({ userNameSelector, roleSelector, avatarSelector }) {
    this._name = document.querySelector(userNameSelector);
    this._about = document.querySelector(roleSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar,
      userId: this._id
    };
  }

  setUserInfo({ name, about, avatar, _id }) {
    if (name) this._name.textContent = name;
    if (about) this._about.textContent = about;
    if (avatar) this._avatar.src = avatar;
    if (_id) this._id = _id;
  }
}
