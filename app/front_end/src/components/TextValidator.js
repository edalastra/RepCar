import React from 'react';
import { ValidatorComponent } from 'react-form-validator-core';
 


class TextValidator extends ValidatorComponent {
 
    render() {
        const { id, type, label ,errorMessages, validators, requiredError, validatorListener, ...rest } = this.props;
 
        return (
            <div className="input-field">
                <input
                    
                    id={id} type={type}
                    {...rest}
                    ref={(r) => { this.input = r; }}
                />
                <label htmlFor={id}>{label}</label>
                {this.errorText()}
            </div>
        );
    }
 
    errorText() {
        const { isValid } = this.state;
 
        if (isValid) {
            return null;
        }
 
        return (
            <span className="red-text text-darken-4">
                {this.getErrorMessage()}
            </span>
                
           
        );
    }
}
 
export default TextValidator;