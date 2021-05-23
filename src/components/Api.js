export default class Api {
  constructor() {
    this._BASE_URL = "https://mesto.nomoreparties.co/v1/cohort-24";
    this._TOKEN = "2c1a2c33-777d-40ba-aa82-2e8cada55ffd";
  }

  getUserInfo() {
    return fetch(`${this._BASE_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization: this._TOKEN,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._BASE_URL}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: this._TOKEN,
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._BASE_URL}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: this._TOKEN,
      },
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getInitialCards() {
    return fetch(`${this._BASE_URL}/cards`, {
      headers: {
        "Content-Type": "application/json",
        authorization: this._TOKEN,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  addCard({ name, link, userId }) {
    return fetch(`${this._BASE_URL}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: this._TOKEN,
      },
      body: JSON.stringify({
        name,
        link,
        _id: userId,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteCard(id) {
    return fetch(`${this._BASE_URL}/cards/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: this._TOKEN,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  likeCard(card) {
    return fetch(`${this._BASE_URL}/cards/likes/${card._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: this._TOKEN,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  unlikeCard(card) {
    return fetch(`${this._BASE_URL}/cards/likes/${card._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: this._TOKEN,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}
