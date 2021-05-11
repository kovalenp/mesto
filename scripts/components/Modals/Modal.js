import { ESC_KEY } from "../../constants.js";

export default class Modal {
  constructor(modalSelector) {
    this._modal = document.querySelector(modalSelector);
  }

  _handleEscClose = (evt) => {
    if (evt.key === ESC_KEY) {
      this.close();
    }
  };

  close() {
    this._modal.classList.remove("modal_opened");
    document.removeEventListener("keyup", this._handleEscClose);
  }

  open() {
    this._modal.classList.add("modal_opened");
    document.addEventListener("keyup", this._handleEscClose);
  }

  setEventListeners() {
    const closeButton = this._modal.querySelector(".modal__close");
    closeButton.addEventListener("click", this.close.bind(this));
  }
}
