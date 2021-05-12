import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  constructor({ modalSelector, onSubmit, formValidator = null }) {
    super(modalSelector);
    this._inputList = this._modal.querySelectorAll(".modal__text-input");
    this._modalForm = this._modal.querySelector(".modal__form");
    this._formValidator = formValidator;
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
    if (!this._formValidator) {
      console.log("Form validator wasn't provided to constructor");
      return;
    }
    this._formValidator.enableValidation();
  }

  setEventListeners() {
    this._modal.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._onSubmit(this._getInputValues());
      this.close();
    });
  }

  open = () => {
    this._inputList.forEach((input) =>
      this._formValidator.hideInputError(input)
    );
    this._formValidator.toggleButtonState();
    super.open();
  };

  close() {
    this._modalForm.reset();
    super.close();
  }
}
