export default class Card {
  constructor(
    data,
    handleCardClick = () => {},
    templateSelector = "#place-template"
  ) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _onLikeHandler(e) {
    e.target.classList.toggle("places__like_active");
  }

  _onDeleteHandler() {
    this._cardItem.remove();
    this._cardItem = null;
  }

  _addEventListeners() {
    this._cardDelete.addEventListener(
      "click",
      this._onDeleteHandler.bind(this)
    );
    this._cardLike.addEventListener("click", this._onLikeHandler);
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

  getCard() {
    this._cardItem = this._getTemplate();
    this._cardImg = this._cardItem.querySelector(".places__img");
    this._cardName = this._cardItem.querySelector(".places__name");
    this._cardDelete = this._cardItem.querySelector(".places__delete");
    this._cardLike = this._cardItem.querySelector(".places__like");

    this._cardImg.src = this._link;
    this._cardImg.alt = `Фотография ${this._name}`;
    this._cardName.textContent = this._name;

    this._addEventListeners();

    return this._cardItem;
  }
}
