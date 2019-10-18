
/*
    Code inspired from https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669
    Function to validate the inputs received from the front end when attempting to log in a user.
*/

// Package Imports
const Validator = require("validator");
const isEmpty = require("is-empty");

function validateLoginInput(data) {
    // Initialise errors object.
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions.
    data.username = !isEmpty(data.username) ? data.username : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    // Username checks.
    // Check if the username field is empty.
    if (Validator.isEmpty(data.username)) {
        errors.username = "Required Field - Please enter a username.";
    }

    // Password checks.
    // Check if the password field is empty.
    if (Validator.isEmpty(data.password)) {
        errors.password = "Required Field - Please enter a password.";
    }

    // Return the errors found and a check whether there were any errors.
    return {
        errors,
        isValid: isEmpty(errors)
    };
};

// Export the validateLoginInput function so it can be used by other files.
module.exports = validateLoginInput;