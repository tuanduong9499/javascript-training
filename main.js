const form = document.querySelector(".form");
const formGroup = form.querySelectorAll(".form-group");

const REQUIRED = "Input is required";

function showError(input, message) {
  let parent = input.parentElement;
  let textError = parent.querySelector(".form-message");
  textError.innerText = message;
  textError.style.color = "red";
}

function showSuccess(input) {
  let parent = input.parentElement;
  let textError = parent.querySelector(".form-message");
  textError.innerText = "";
}

function checkEmptyValueError(listInputElement) {
  let check = false;
  listInputElement.forEach((input) => {
    if (!input.value.trim()) {
      showError(input, REQUIRED);
      check = true;
    } else {
      showSuccess(input);
    }
  });
  return check;
}

function checkEmailError(input) {
  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  if (regexEmail.test(input.value.trim())) {
    showSuccess(input);
    return false;
  } else {
    showError(input, "Email Invalid");
    return true;
  }
}

function checkLengthError(input, min, max) {
  input.value = input.value.trim();

  if (input.value.length < min) {
    showError(input, `must have at least ${min} characters`);
    return true;
  } else if (input.value.length > max) {
    showError(input, `no more than ${max} characters`);
    return true;
  } else {
    showSuccess(input);
    return false;
  }
}

function checkConfirmPassword() {
  let password = document.getElementById("password");
  let confirmPassword = document.getElementById("confirmPassword");
  if (password.value !== confirmPassword.value) {
    showError(confirmPassword, "password does not match");
    return true;
  } else {
    showSuccess(confirmPassword);
  }
  return false;
}

form.addEventListener("submit", function (e) {
  const dataInput = [];
  let checkValid;
  Array.from(formGroup).forEach((element) => {
    dataInput.push(element.querySelector("input[name]"));
  });

  checkValid = checkEmptyValueError(dataInput);
  let isCheckEmailError = checkEmailError(email);
  let isCheckLengthError = checkLengthError(username, 5, 10);
  let isCheckConfirmPassword = checkConfirmPassword();

  if (
    !checkValid &&
    !isCheckEmailError &&
    !isCheckLengthError &&
    !isCheckConfirmPassword
  ) {
    console.log("oke");
  } else {
    console.log("not oke");
  }

  e.preventDefault();
});
