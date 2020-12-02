import React from 'react';
 
const InputComponent = props => {
 
   
        const { id, type, label ,errorMessages, reference, name, placeholder, onBlur, onChange, ...rest } = props;
 
        return (
            <div className="input-field">
                <input
                    
                    id={id} type={type}
                    name={name}
                    ref={reference}
                    placeholder={placeholder}
                    onBlur={onBlur}
                    onChange={onChange}
                    {...rest}
                />
                <label htmlFor={id}>{label}</label>
                <span className="red-text text-darken-4">
                {errorMessages}
                </span>
                
            </div>
        );
    
}
 
export default InputComponent;