
/*
    Code inspired from https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669
    Function to validate the inputs received from the front end when attempting to update a user's information.
*/

// Package Imports
const Validator = require("validator");
const isEmpty = require("is-empty");

function validateUpdateInput(data) {
    // Initialise errors object.
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions.
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    // Email checks.
    // Check if the email field is empty.
    if (data.email !== "") {
        // Check if the email field contains a valid email address.
        if (!Validator.isEmail(data.email)) {
            errors.email = "Invalid Field - Please enter a valid email address.";
        }
    }

    // Password checks.
    // Check if the password field is empty.
    if (data.password !== "") {
        // Check if the password field contains between 6 and 30 characters.
        if (!Validator.isLength(data.password, {min: 6, max: 30})) {
            errors.password = "Invalid Field - Password must be at least 6 characters.";
        }
        // Check that the password field contains the same string as the confirm password field.
        if (!Validator.equals(data.password, data.password2)) {
            errors.password2 = "Invalid Field - Passwords do not match, please try again.";
        }
    }

    // Return the errors found and a check whether there were any errors.
    return {
        errors,
        isValid: isEmpty(errors)
    };
};

// Export the validateUpdateInput function so it can be used by other files.
module.exports = validateUpdateInput;