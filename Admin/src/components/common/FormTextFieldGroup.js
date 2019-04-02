import React from 'react';

import TextField from "material-ui/TextField";

import PropTypes from 'prop-types';

const TextFieldGroup = ({ field, value, label, error, type, onChange, checkUserExists,hintText, floatingLabelText}) => {
      return (
    <div>
     
  <TextField
        onChange={onChange}
        label ={label}
        onBlur={checkUserExists}
        value={value}
        type={type}
        name={field}
        hintText={hintText}
        floatingLabelText={floatingLabelText}
      />
    
    {error &&  <span style={{ color: 'red' }}>{error}</span>}
    </div>  );
}

  TextFieldGroup.propTypes ={
  field: PropTypes.string.isRequired,
  // value: PropTypes.string.isRequired,
  // label: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checkUserExists: PropTypes.func

}

TextFieldGroup.defaultProps = {
  type: 'text',  
}

export default TextFieldGroup;
