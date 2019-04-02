var isEmpty = require('lodash/isEmpty');
const Validator = require('validator');

module.exports = function validateInput(data) {
    let errors = {};

    if (Validator.isEmpty(data.password)) {
        errors.password = 'This field is requried';
    }
    if (Validator.isEmpty(data.passwordConformation)) {
        errors.passwordConformation = 'This field is requried';
    }

    if (!Validator.equals(data.password, data.passwordConformation)) {
        errors.passwordConformation = 'Password must match';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
