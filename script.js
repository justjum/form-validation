//regular expression for email validity
//const emailRegExp = new RegExp('^\S+@\S+$');

// ^ = beginning of line anchor
// $ = end of line anchor
// * = checks for character in all indices 
const numbersRegExp = new RegExp("^[0-9]*$");
// () = seperates strings, ie needs to find both
// ?=./*? looks for those characters anywhere
// {x,y} sets a min/max length
const passwordRegExp = new RegExp("^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!@#$%^&*()]).{8,12}$");


// form entries
const email = document.getElementById("email");
const country = document.getElementById("country");
const zipCode = document.getElementById("zip-code");
const password = document.getElementById("password");
const passwordConfirm = document.getElementById("password-confirm");
const submit = document.getElementById("submit");

const emailError = document.getElementById("email-error");
const countryError = document.getElementById("country-error");
const zipCodeError = document.getElementById("zip-error");
const passwordError = document.getElementById("password-error");
const passwordConfirmError = document.getElementById("password-confirm-error");

email.addEventListener("input", (e) => {
  if (email.validity.valid) {
    emailError.textContent = "";
  } else {
    showError(email);
  }
});

country.addEventListener("click", () => {
  console.log(country.value);
  if (country.value === "none") {
    showError(country);
  }
  switch (country.value) {
    case "au":
      zipCode.setAttribute("minLength", +4);
      zipCode.setAttribute("maxLength", +4);
      break;
    case "ca":
      zipCode.setAttribute("minLength", +6);
      zipCode.setAttribute("maxLength", +6);
      break;
    case "hk":
      zipCode.setAttribute("minLength", +6);
      zipCode.setAttribute("maxLength", +6);
      break;
    case "es":
      zipCode.setAttribute("minLength", +5);
      zipCode.setAttribute("maxLength", +5);
      break;
    case "us":
      zipCode.setAttribute("minLength", +5);
      zipCode.setAttribute("maxLength", +5);
      break;
  }
});

zipCode.addEventListener("input", () => {
  let maxLength = +zipCode.getAttribute("maxlength");

  if (maxLength === 1) {
    zipCodeError.textContent = "Please select a country.";
  } else if (!numbersRegExp.test(zipCode.value)) {
    zipCodeError.textContent = "Please enter numeric characters only.";
  } else if (zipCode.value.length !== maxLength) {
    zipCodeError.textContent = `Please enter a zipcode with ${maxLength} numeric characters`;
  } else {
    zipCodeError.textContent = "";
  }
});

password.addEventListener("input", () => {
  passwordRegCheck();
  confirmPassword();
});

passwordConfirm.addEventListener("input", () => {
    confirmPassword();
});

function passwordRegCheck() {
    if (!passwordRegExp.test(password.value)) {
        passwordError.textContent = 'Password must be 8-12 characters, including one lower-case letter, one upper-case letter, one number, and one special character.'
      }
    
      else {
        passwordError.textContent = "";
      }
}

function confirmPassword() {
    if (password.value === "") {
        passwordConfirmError.textContent = `Please complete "password" field.`;
    }
    else if (password.value !== passwordConfirm.value) {
        passwordConfirmError.textContent = 'Passwords do not match';
    }
    else {
        console.log("this");
        passwordConfirmError.textContent = "";
    }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

function showError(input) {
  let errorType = input.id + "Error";
  console.log(input.validity);
  if (input.validity.valueMissing) {
    switch (errorType) {
      case "emailError":
        emailError.textContent = "Please enter your email address.";
      case "countryError":
        countryError.textContent = "Please select a country";
    }
  } else if (input.validity.typeMismatch || input.validity.patternMismatch) {
    switch (errorType) {
      case "emailError":
        emailError.textContent =
          "Please enter email address in the form 'name@domain.com'.";
    }
  }
}
