
const form = document.getElementById("registrationForm");
const formMessage = document.getElementById("formMessage");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const phone = document.getElementById("phone");
const country = document.getElementById("country");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const phoneError = document.getElementById("phoneError");
const genderError = document.getElementById("genderError");
const hobbiesError = document.getElementById("hobbiesError");
const countryError = document.getElementById("countryError");

function showError(input, errorElement, message) {
    errorElement.textContent = message;

    if (input) {
        input.classList.toggle("invalid", message !== "");
        input.classList.toggle(
            "valid",
            message === "" && input.value.trim() !== ""
        );
    }

    return message === "";
}

// Validate Full Name
function validateName() {
    const value = fullName.value.trim();

    if (value === "") {
        return showError(
            fullName, nameError, "Full name cannot be empty."
        );
    }

    return showError(fullName, nameError, "");
}

// Validate Email
function validateEmail() {
    const value = email.value.trim();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === "") {
        return showError(
            email, emailError, "Email cannot be empty."
        );
    }

    if (!pattern.test(value)) {
        return showError(
            email, emailError, "Enter a valid email address."
        );
    }

    return showError(email, emailError, "");
}

// Validate Password
function validatePassword() {
    if (password.value.length < 6) {
        return showError(
            password, passwordError,
            "Password must contain at least 6 characters."
        );
    }

    showError(password, passwordError, "");

    if (confirmPassword.value !== "") {
        validateConfirmPassword();
    }

    return true;
}

// Validate Confirm Password
function validateConfirmPassword() {
    if (confirmPassword.value === "") {
        return showError(
            confirmPassword,
            confirmPasswordError,
            "Please confirm your password."
        );
    }

    if (confirmPassword.value !== password.value) {
        return showError(
            confirmPassword,
            confirmPasswordError,
            "Passwords do not match."
        );
    }

    return showError(
        confirmPassword, confirmPasswordError, ""
    );
}

// Validate Phone Number
function validatePhone() {
    const value = phone.value.trim();

    if (value === "") {
        return showError(
            phone, phoneError, "Phone number cannot be empty."
        );
    }

    if (!/^[0-9]+$/.test(value)) {
        return showError(
            phone, phoneError, "Phone number must contain numbers only."
        );
    }

    if (value.length < 10) {
        return showError(
            phone, phoneError,
            "Phone number must contain at least 10 digits."
        );
    }

    return showError(phone, phoneError, "");
}

// Validate Gender
function validateGender() {
    const selected = document.querySelector(
        'input[name="gender"]:checked'
    );

    genderError.textContent = selected
        ? ""
        : "Please select your gender.";

    document.getElementById("genderGroup")
        .classList.toggle("invalid", !selected);

    return Boolean(selected);
}

// Validate Hobbies
function validateHobbies() {
    const selected = document.querySelectorAll(
        'input[name="hobbies"]:checked'
    );

    hobbiesError.textContent = selected.length === 0
        ? "Please select at least one hobby."
        : "";

    document.getElementById("hobbiesGroup")
        .classList.toggle("invalid", selected.length === 0);

    return selected.length > 0;
}

// Validate Country
function validateCountry() {
    if (country.value === "") {
        countryError.textContent = "Please select your country.";
        country.classList.add("invalid");
        country.classList.remove("valid");
        return false;
    }

    countryError.textContent = "";
    country.classList.remove("invalid");
    country.classList.add("valid");

    return true;
}

// Real-time validation
fullName.addEventListener("input", validateName);
email.addEventListener("input", validateEmail);
password.addEventListener("input", validatePassword);
confirmPassword.addEventListener("input", validateConfirmPassword);
phone.addEventListener("input", validatePhone);
country.addEventListener("change", validateCountry);

document.querySelectorAll('input[name="gender"]').forEach(function (input) {
    input.addEventListener("change", validateGender);
});

document.querySelectorAll('input[name="hobbies"]').forEach(function (input) {
    input.addEventListener("change", validateHobbies);
});

// Submit form
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const results = [
        validateName(),
        validateEmail(),
        validatePassword(),
        validateConfirmPassword(),
        validatePhone(),
        validateGender(),
        validateHobbies(),
        validateCountry()
    ];

    const isValid = results.every(function (result) {
        return result === true;
    });

    if (isValid) {
        formMessage.textContent =
            "Form submitted successfully! All fields are valid.";

        formMessage.className = "success";
    } else {
        formMessage.textContent =
            "Please correct the errors above.";

        formMessage.className = "failure";
    }
});

// Reset form
form.addEventListener("reset", function () {
    setTimeout(function () {
        document.querySelectorAll(".error").forEach(function (element) {
            element.textContent = "";
        });

        document.querySelectorAll(".invalid, .valid").forEach(function (element) {
            element.classList.remove("invalid", "valid");
        });

        formMessage.textContent = "";
        formMessage.className = "";
    }, 0);
});
