import Modal from "./Modal.js";
import FormValidator from "../../validation/FormValidator.js";

export default class ModalWithForm extends Modal {
  constructor({ modalSelector, onSubmit }) {
    super(modalSelector);
    this._modal = document.querySelector(modalSelector);
    this._inputList = this._modal.querySelectorAll(".modal__text-input");
    this._modalForm = this._modal.querySelector(".modal__form");
    this._formValidator = new FormValidator({}, this._modalForm);
    this._onSubmit = onSubmit;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );

    return this._formValues;
  }

  enableFormValidation() {
    this._formValidator.enableValidation();
  }

  setEventListeners() {
    super.setEventListeners();
    this._modal.addEventListener("submit", (evt) => {
      this._onSubmit(evt, this._getInputValues());
      this.close();
    });
  }

  open() {
    this._inputList.forEach((input) =>
      this._formValidator.hideInputError(input)
    );
    // not needed?
    // this._modalForm.reset();
    this._formValidator.toggleButtonState();
    super.open();
  }

  close() {
    this._modalForm.reset();
    super.close();
  }
}
