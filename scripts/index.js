const editButton = document.querySelector('.profile__edit');
const closeButton = document.querySelector('.popup__close');

const formElement = document.querySelector('.popup__form');

const profileName = document.querySelector('.profile__name');
const profileRole = document.querySelector('.profile__role');

const usernameInput = document.querySelector('#username');
const roleInput = document.querySelector('#role');

editButton.addEventListener('click', openPopup);

closeButton.addEventListener('click', closePopup);

function openPopup() {
  document.querySelector('.popup').classList.add('popup_opened');
  usernameInput.value = profileName.innerText || '';
  roleInput.value = profileRole.innerText || '';
}

function closePopup() {
  document.querySelector('.popup').classList.remove('popup_opened');
}

function formSubmitHandler(e) {
  e.preventDefault();
  profileName.textContent = usernameInput.value;
  profileRole.textContent = roleInput.value;
  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
