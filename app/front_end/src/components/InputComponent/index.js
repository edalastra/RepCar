import React from 'react';
 
const InputComponent = props => {
 
   
        const { id, type, label ,errorMessages, reference, name, placeholder, onBlur, onChange } = props;
 
        return (
            <div className="input-field">
                <input
                    
                    id={id} type={type}
                    name={name}
                    ref={reference}
                    placeholder={placeholder}
                    onBlur={onBlur}
                    onChange={onChange}
                />
                <label htmlFor={id}>{label}</label>
                <span className="red-text text-darken-4">
                {errorMessages}
                </span>
                
            </div>
        );
    
}
 
export default InputComponent;