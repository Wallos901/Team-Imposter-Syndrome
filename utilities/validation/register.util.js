// Code taken from https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669

const Validator = require("validator");
const isEmpty = require("is-empty");

function validateRegisterInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.username = !isEmpty(data.username) ? data.username : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    // Name checks
    if (Validator.isEmpty(data.username)) {
        errors.username = "Required Field - Please enter a username.";
    } else if (!Validator.isAlphanumeric(data.username)) {
        errors.username = "Invalid Field - Username should contain only alphanumeric characters."
    }

    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Required Field - Please enter an email address.";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Invalid Field - Please enter a valid email address.";
    }

    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Required Field - Please enter a password.";
    }
    if (!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = "Invalid Field - Password must be at least 6 characters.";
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Invalid Field - Passwords do not match, please try again.";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = validateRegisterInput;