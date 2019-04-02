var isEmpty = require('lodash/isEmpty');
const Validator = require('validator');

module.exports =function validateInput(data){
    let errors ={};
    const username = RegExp(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/);

    if(Validator.isEmpty(data.username)){
        errors.username =  'Name is required';
        console.log("username");
    }
    else if(!username.test(data.username))
    {
        errors.username = 'Letters and spaces only';
    }
    if(Validator.isEmpty(data.email)){
        errors.email = 'Email ID is required';
    }
    else if(!Validator.isEmail(data.email)){
        errors.email ='Email is invalid';
    }
    if(Validator.isEmpty(data.password)){
        errors.password = 'This field is requried';
    }
    if(Validator.isEmpty(data.passwordConformation)){
        errors.passwordConformation = 'This field is requried';
    }
    if(!Validator.equals(data.password,data.passwordConformation)){
        errors.passwordConformation = 'Password must match';
    }

    return{
        errors,
        isValid: isEmpty(errors)
    }
}
