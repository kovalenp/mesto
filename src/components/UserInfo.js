export default class UserInfo {
  constructor({ userNameSelector, roleSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._role = document.querySelector(roleSelector);
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      role: this._role.textContent,
    };
  }

  setUserInfo({ username, role }) {
    this._userName.textContent = username;
    this._role.textContent = role;
  }
}
