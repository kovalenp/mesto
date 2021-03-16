const editButton = document.querySelector(".profile__edit");
const closeButton = document.querySelector(".popup__close");
const likeButtons = document.querySelectorAll(".places__like");

const formElement = document.querySelector(".popup__form");

const popup = document.querySelector(".popup");

const profileName = document.querySelector(".profile__name");
const profileRole = document.querySelector(".profile__role");

const usernameInput = document.querySelector("#username");
const roleInput = document.querySelector("#role");

editButton.addEventListener("click", openPopup);

closeButton.addEventListener("click", closePopup);

function openPopup() {
  popup.classList.add("popup_opened");
  usernameInput.value = profileName.textContent;
  roleInput.value = profileRole.textContent;
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(e) {
  e.preventDefault();
  profileName.textContent = usernameInput.value;
  profileRole.textContent = roleInput.value;
  closePopup();
}

formElement.addEventListener("submit", formSubmitHandler);

likeButtons.forEach((likeButton) => {
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("places__like_active");
  });
});
