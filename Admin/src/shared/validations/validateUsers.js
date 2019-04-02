var isEmpty = require("lodash/isEmpty");

const validators = require("validator");

module.exports = function validateInput(data) {
    let errors = {};
    if (validators.isEmpty(data.name)) {
        errors.name = "this field is empty";
    }
    if (validators.isEmpty(data.password)) {
        errors.password = "this field is empty";
    }
    if (validators.isEmpty(data.phoneNumber)) {
        errors.phoneNumber = "this field is empty";
    }
    if (validators.isEmpty(data.email)) {
        errors.email = "this field is empty";
    }
    if (validators.isEmpty(data.photoUrl)) {
        errors.photoUrl = "this field is empty";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
