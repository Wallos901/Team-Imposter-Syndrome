// Code taken from https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669

const Validator = require("validator");
const isEmpty = require("is-empty");

function validateRegisterInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    // Email checks
    if (data.email !== "") {
        if (!Validator.isEmail(data.email)) {
            errors.email = "Invalid Field - Please enter a valid email address.";
        }
    }

    // Password checks
    if (data.password !== "") {
        if (!Validator.isLength(data.password, {min: 6, max: 30})) {
            errors.password = "Invalid Field - Password must be at least 6 characters.";
        }
        if (!Validator.equals(data.password, data.password2)) {
            errors.password2 = "Invalid Field - Passwords do not match, please try again.";
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = validateRegisterInput;