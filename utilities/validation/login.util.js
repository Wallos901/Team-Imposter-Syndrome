// Code taken from https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669

const Validator = require("validator");
const isEmpty = require("is-empty");

function validateLoginInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.username = !isEmpty(data.username) ? data.username : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    // Username checks
    if (Validator.isEmpty(data.username)) {
        errors.username = "Required Field - Please enter a username.";
    }

    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Required Field - Please enter a password.";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = validateLoginInput;