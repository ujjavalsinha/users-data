import React from 'react';
import './InputField.css';

const InputField = props => {
    const {
        type = 'text',
        inputValue='',
        onInputChange= () => {},
        placeholder = 'Search'
    } = props;

    return (
        <input 
            className='input-field' 
            type={type} value={inputValue} 
            placeholder={placeholder} 
            onChange={(e) => onInputChange(e.target.value)} 
        />
    )

}

export default InputField;