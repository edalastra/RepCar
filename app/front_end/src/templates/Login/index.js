import React, { useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { login } from '../../auth';
import TextValidator from '../../components/TextValidator';
import axios from 'axios';
import './style.css';
import ValidatorForm from 'react-form-validator-core/lib/ValidatorForm';
import $ from 'jquery';

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const submit = () => {
        axios.post('http://localhost:8080/api/authenticate', {email, password})
            .then(res => {
                login(res.data.token);
                props.history.replace('/logged/'+res.data.user.type)
            })
            .catch(err => {
                setError(err.response.data)
                $('.danger').removeClass('hide')
            });
    }

    const { errorMessages, validators, requiredError, validatorListener, value, ...rest } = props;
    const refForm = useRef('form');
    return (
        <>
       
      
            <div className="container">
            
            <div  className="materialert danger hide " >
		    <div className="material-icons">info</div>
		        {error}
		    </div>
            
                <div className="row">
            <div className="col s12 m7 offset-m3 l6 offset-l3 z-depth-6 card-panel box ">
               <div className="container ">
            <div className="section login-panel">
                <h5 className="black-text center">Entre para continuar</h5>
           
             
                    <ValidatorForm onSubmit={submit} ref={refForm}>
                    <div className='row '>
                    
                        <div className='input-field col s12'>
                        <TextValidator 
                                    id="email" name="email" type="text" 
                                    label="E-mail" className="validate"
                                    onChange={event => setEmail(event.target.value)}
                                    value={email}
                                    validators={['required','isEmail']}
                                    errorMessages={['Este campo é obrigatório','E-mail inválido']}
                                />
                        </div>
                    </div>
                    
                    <div className='row'>
                        <div className='input-field col s12'>
                        <TextValidator 
                                    id="password" name="password" type="password" 
                                    label="Senha" className="validate"
                                    onChange={event => setPassword(event.target.value)}
                                    value={password}
                                    validators={['required']}
                                    errorMessages={['Este campo é obrigatório']}
                                />
                        </div>
                        </div>
                        
                        <div className="row">
                        <label className="right">
                        <a><b >Esqueceu sua senha?</b></a>
                        </label>
                    </div>   
                        <div className='row'>
                        <button  type='submit' name='btn_login' className='col s12 waves-effect waves-light btn red darken-4'>Entrar</button>
                        </div>
                  </ValidatorForm>
            
               </div>
              </div>
              </div>
              </div>
              </div>
                <div className="center">
                   <p>Não possui conta? <a>Cadastre-se</a></p>
              </div>
            </>             
    )
}

export default withRouter(Login);