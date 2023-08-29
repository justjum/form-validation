//regular expression for email validity
//const emailRegExp = new RegExp('^\S+@\S+$');

// form entries
const email = document.getElementById("email");
const country = document.getElementById("country");
const zipCode = document.getElementById("zip-code");
const password = document.getElementById("password");
const passwordConfirm = document.getElementById("password-confirm");
const submit = document.getElementById("submit");

const emailError = document.getElementById("email-error");
const countryError = document.getElementById("country-error");
const zipCodeError = document.getElementById("zip-error")

email.addEventListener("input", (e) => {
    
    if (email.validity.valid) {
        emailError.textContent = "";
    }
    else {
        showError(email);
    }
    console.log(email.value);
    console.log(country.value);
    console.log(zipCode);
    console.log(password.value);
    console.log(passwordConfirm.value);
});

country.addEventListener("click", () => {
    console.log(country.value)
    if (country.value === "none") {
        showError(country);
    }
    switch (country.value) {
        case 'au': 
            zipCode.setAttribute("minLength", 4);
            zipCode.setAttribute("maxLength", 4);
            break;
        case 'ca':
            zipCode.setAttribute("minLength", 6);
            zipCode.setAttribute("maxLength", 6);
            break;
        case 'hk':
            zipCode.setAttribute("minLength", 6);
            zipCode.setAttribute("maxLength", 6);
            break;
        case 'es':
            zipCode.setAttribute("minLength", 5);
            zipCode.setAttribute("maxLength", 5);
            break;
        case 'us':
            zipCode.setAttribute("minLength", 5);
            zipCode.setAttribute("maxLength", 5);
            break;
    }
});

zipCode.addEventListener("input", () => {
    console.log(zipCode.getAttribute("maxlength"));
    if (+zipCode.getAttribute("maxlength") === 1) {
        zipCodeError.textContent = 'Please select a country.'
    }
    console.log(zipCode.validity);
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
})

function showError(input) {
    let errorType = input.id+"Error";
    console.log(input.validity)
    if (input.validity.valueMissing) {
        switch (errorType) {
            case 'emailError': emailError.textContent = "Please enter your email address."
            case 'countryError' : countryError.textContent = "Please select a country";
        }
        
    }
    else if (input.validity.typeMismatch || input.validity.patternMismatch) {
        switch(errorType) {
            case 'emailError': emailError.textContent = "Please enter email address in the form 'name@domain.com'."
        }
        
    }

}