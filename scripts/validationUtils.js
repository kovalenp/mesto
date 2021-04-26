import { INPUT_ERROR_CLASS, ERROR_CLASS } from "./constants.js";

export function showInputError(
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass = INPUT_ERROR_CLASS,
  errorClass = ERROR_CLASS
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${errorClass}`);
}

export function hideInputError(
  formElement,
  inputElement,
  inputErrorClass = INPUT_ERROR_CLASS,
  errorClass = ERROR_CLASS
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${inputErrorClass}`);
  errorElement.classList.remove(`${errorClass}`);
  errorElement.textContent = "";
}

function _hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

export function toggleButtonState(inputList, buttonElement) {
  if (_hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}
