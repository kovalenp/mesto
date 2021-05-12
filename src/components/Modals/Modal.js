import { ESC_KEY } from "../../utils/constants.js";

export default class Modal {
  constructor(modalSelector) {
    this._modal = document.querySelector(modalSelector);
    this._closeButton = this._modal.querySelector(".modal__close");
    this._modalContainer = this._modal.querySelector(".modal__container");
  }

  close() {
    this._modal.classList.remove("modal_opened");
    document.removeEventListener("keyup", this._handleEscClose);
  };

  _handleEscClose = (evt) => {
    if (evt.key === ESC_KEY) {
      this.close();
    }
  };

  _onContainerClick = (evt) => {
    evt.stopPropagation();
  };

  _onOverlayClick = () => {
    this.close();
  };

  open() {
    this._modal.classList.add("modal_opened");
    document.addEventListener("keyup", this._handleEscClose);
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", this.close.bind(this));
    this._modalContainer.addEventListener("mousedown", this._onContainerClick);
    document.addEventListener("mousedown", this._onOverlayClick);
  };
}
