export default class Card {
  constructor({
    data,
    handleCardClick: handleCardClick = () => { },
    handleDeleteClick: handleDeleteClick = () => console.log("test"),
    templateSelector: templateSelector = "#place-template",
    handleLike: handleLike = () => { },
    userId: userId = null,
  }) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLike = handleLike;
    this._userId = userId
    this._isDeletePossible = data.owner._id === userId;
    this._likes = data.likes
    this._likedByUser = this._likes.find(like => like._id === this._userId)
  }

  _onLikeHandler() {
    if (this._cardLikeButton.classList.contains("places__like_active")) {
      this._handleLike(this, false)
    } else {
      this._handleLike(this, true)
    }
  }

  _onDeleteHandler() {
    this._handleDeleteClick(this)
  }

  _addEventListeners() {
    this._cardDelete.addEventListener(
      "click",
      this._onDeleteHandler.bind(this)
    );
    this._cardLikeButton.addEventListener("click", this._onLikeHandler.bind(this));
    this._cardImg.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".places__item")
      .cloneNode(true);
  }

  removeCard() {
    this._cardItem.remove();
    this._cardItem = null;
  }

  like(newCount) {
    this._cardLikeCounter.textContent = newCount
    this._cardLikeButton.classList.toggle("places__like_active")
  }

  getCard() {
    this._cardItem = this._getTemplate();
    this._cardImg = this._cardItem.querySelector(".places__img");
    this._cardName = this._cardItem.querySelector(".places__name");
    this._cardDelete = this._cardItem.querySelector(".places__delete");
    this._cardDelete.disabled = !this._isDeletePossible;
    this._cardLikeButton = this._cardItem.querySelector(".places__like");
    this._cardLikeCounter = this._cardItem.querySelector(".places__like-counter");

    if (this._likedByUser) {
      this._cardLikeButton.classList.add("places__like_active")
    }

    this._cardLikeCounter.textContent = this._likes.length
    this._cardImg.src = this._link;
    this._cardImg.alt = `Фотография ${this._name}`;
    this._cardName.textContent = this._name;

    this._addEventListeners();

    return this._cardItem;
  }
}
