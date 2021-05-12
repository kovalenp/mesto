import {
  INPUT_ERROR_CLASS,
  ERROR_CLASS,
  DEFAULT_INPUT_SELECTOR,
  DEFAULT_SUBMIT_SELECTOR,
} from "../utils/constants.js";

export default class FormValidator {
  constructor(selectors, formElement) {
    this._formElement = formElement;
    this._inputSelector = selectors.inputSelector || DEFAULT_INPUT_SELECTOR;
    this._submitSelector = selectors.submitSelector || DEFAULT_SUBMIT_SELECTOR;
    this._inputErrorClass = selectors.inputErrorClass || INPUT_ERROR_CLASS;
    this._errorClass = selectors.errorElement || ERROR_CLASS;
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
    this.toggleButtonState(this._inputList, this._submitElement);

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
