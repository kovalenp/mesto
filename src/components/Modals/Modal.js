import { ESC_KEY } from "../../utils/constants.js";

export default class Modal {
  constructor(modalSelector) {
    this._modal = document.querySelector(modalSelector);
    this._closeButton = this._modal.querySelector(".modal__close");
    this._modalContainer = this._modal.querySelector(".modal__container");
  }

  close = () => {
    this._modal.classList.remove("modal_opened");
    this._removeEventListeners();

    // // cleanup form onClose if modal has one
    // const modalForm = this._modal.querySelector(".modal__form");
    // if (modalForm) modalForm.reset();
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
    this._setEventListeners();
  }

  _setEventListeners = () => {
    document.addEventListener("keyup", this._handleEscClose);
    this._closeButton.addEventListener("click", this.close);
    this._modalContainer.addEventListener("mousedown", this._onContainerClick);
    document.addEventListener("mousedown", this._onOverlayClick);
  };

  _removeEventListeners = () => {
    document.removeEventListener("keyup", this._handleEscClose);
    this._closeButton.removeEventListener("click", this.close);
    this._modalContainer.removeEventListener(
      "mousedown",
      this._onContainerClick
    );
    document.removeEventListener("mousedown", this._onOverlayClick);
  };
}
