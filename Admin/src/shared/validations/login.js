import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
export default function validateInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.identifier)) {
    errors.identifier = 'Enter an email or username';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Enter a password';
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
