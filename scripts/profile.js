const profileEditButton = document.querySelector(".profile__edit");
const profileCloseButton = document.querySelector(".modal__close_profile");

const profileForm = document.querySelector(".modal__form_profile");
const profileModal = document.querySelector(".modal_profile");
const profileName = document.querySelector(".profile__name");
const profileRole = document.querySelector(".profile__role");
const usernameInput = document.querySelector("#username");
const roleInput = document.querySelector("#role");

profileEditButton.addEventListener("click", openProfileModal);

profileCloseButton.addEventListener("click", () => closeModal(profileModal));

function openProfileModal() {
  profileModal.classList.add("modal_opened");
  usernameInput.value = profileName.textContent;
  roleInput.value = profileRole.textContent;
}

function profileSubmitHandler(e) {
  e.preventDefault();
  profileName.textContent = usernameInput.value;
  profileRole.textContent = roleInput.value;
  closeModal(profileModal);
}

profileForm.addEventListener("submit", profileSubmitHandler);
