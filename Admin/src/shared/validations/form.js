var isEmpty = require('lodash/isEmpty');
const Validator = require('validator');

module.exports =function validateInput(data){
    let errors ={};
    const First_Name = RegExp(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/);
    const Last_Name = RegExp(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/);
    const Age =RegExp(/^\S[0-9]{0,1}$/);
    // const Permanent_Address1 = RegExp('^[a-z]+[a-zA-Z0-9 -\\:;_]*$', 'i');
    // const Correspondence_Address1 = RegExp('^[a-z]+[a-zA-Z0-9 -\\:;]*$', 'i');
    const Designation = RegExp('^[a-z]+[a-zA-Z0-9 -]*$', 'i');
// const Experience = RegExp(/^\S[0-9]{0,1}$/);
const Package = RegExp(/^\d{1,6}(?:\.\d{0,2})?$/);

    if(Validator.isEmpty(data.First_Name)){
        errors.First_Name =  'Name is required';
        console.log("First_Name");
    }
    else if(!First_Name.test(data.First_Name))
    {
        errors.First_Name = 'Letters and spaces only';
    }
    if(Validator.isEmpty(data.Last_Name)){
        errors.Last_Name =  'Last Name is required';
        console.log("Last_Name");
    }
    else if(!Last_Name.test(data.Last_Name))
    {
        errors.Last_Name = 'Letters and spaces only';
    }
    if(Validator.isEmpty(data.Age)){
        errors.Age =  'Age is required';
        console.log("Age");
    }
    else if(!Age.test(data.Age))
    {
        errors.Age = 'Letters and spaces only';
    }
    if(Validator.isEmpty(data.Email_id)){
        errors.Email_id = 'Email ID is required';
    }
    else if(!Validator.isEmail(data.Email_id)){
        errors.Email_id ='Email is invalid';
    }
    if(Validator.isEmpty(data.Mobile_number)){
        errors.Mobile_number = 'Mobile number is required';
    }
    if(Validator.isEmpty(data.Permanent_Address1)){
        errors.Permanent_Address1 =  'Field is required';
        console.log("Permanent_Address1");
    }
    if(Validator.isEmpty(data.Correspondence_Address1)){
        errors.Correspondence_Address1 =  'Field is required';
        console.log("Correspondence_Address1");
    }
    if(Validator.isEmpty(data.Course_Duration)){
        errors.Course_Duration =  'Field is required';
        console.log("Course_Duration");
    }
    
    if(Validator.isEmpty(data.professional.Designation)){
        errors.Designation =  'Designation Field is required';
        console.log("Designation");
    }
    else if(!Designation.test(data.professional.Designation))
    {
        errors.Designation = 'Letters and spaces only';
    }

    if(Validator.isEmpty(data.professional.Experience)){
        errors.Experience =  'Experience Field is required';
        console.log("Experience");
    }

    if(Validator.isEmpty(data.professional.Package)){
        errors.Package =  'Package Field is required';
        console.log("Package");
    }
    else if(!Package.test(data.professional.Package))
    {
        errors.Package = 'Use format like 2563.25';
    }
    if(Validator.isEmpty(data.professional.Notice_Period)){
        errors.Notice_Period =  'Notice_Period Field is required';
        console.log("Notice_Period");
    }
   
    return{
        errors,
        isValid: isEmpty(errors)
    }
}
