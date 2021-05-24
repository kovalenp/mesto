export default class FormValidator {
  constructor(selectors, formElement) {
    this._formElement = formElement;
    this._inputSelector = selectors.inputSelector || ".modal__text-input";
    this._submitSelector = selectors.submitSelector || ".modal__submit-input";
    this._inputErrorClass =
      selectors.inputErrorClass || "modal__text-input_error";
    this._errorClass =
      selectors.errorElement || "modal__text-input-error_active";
    this._inputList = Array.from(
      this._formElement.querySelectorAll(`${this._inputSelector}`)
    );
    this._submitElement = this._formElement.querySelector(
      `${this._submitSelector}`
    );
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(`${this._inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${this._errorClass}`);
  }

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(inputElement);
    }
  };

  hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(`${this._inputErrorClass}`);
    errorElement.classList.remove(`${this._errorClass}`);
    errorElement.textContent = "";
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitElement.disabled = true;
    } else {
      this._submitElement.disabled = false;
    }
  }

  _setEventListeners = () => {
    this.toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  };

  enableValidation() {
    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
