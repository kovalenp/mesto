import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  constructor({ modalSelector, onSubmit, formValidator = null }) {
    super(modalSelector);
    this._inputList = this._modal.querySelectorAll(".modal__text-input");
    this._modalForm = this._modal.querySelector(".modal__form");
    this._submitButton = this._modalForm.querySelector(".modal__submit-input");
    this._defaultSubmitButtonValue = this._submitButton.value;
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
    this._modalForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._onSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  setLoading = (isLoading) => {
    if (isLoading) {
      this._submitButton.value = "Сохранение...";
    } else {
      this._submitButton.value = this._defaultSubmitButtonValue;
    }
  };

  open = () => {
    if (this._formValidator) {
      this._inputList.forEach((input) =>
        this._formValidator.hideInputError(input)
      );
      this._formValidator.toggleButtonState();
    }
    super.open();
  };

  close() {
    super.close();
    this._modalForm.reset();
  }
}
