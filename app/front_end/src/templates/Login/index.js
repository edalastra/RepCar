import React, { useRef, useState, useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import api from '../../api';
import { useForm } from "react-hook-form";
import InputComponent from '../../components/InputComponent';
import { login, intranetLogin, isAuthenticated, isWorker } from '../../auth';
import './style.css';

const Login = (props) => {
    const history = useHistory();
    const location = useLocation()

    const { handleSubmit, register, errors, watch } = useForm();
    const [error, setError] = useState('');
    const toIntranet = location.pathname.split('/')[2] == 'intranet';

    

    const onSubmit = async values => {
       

        try {
            if(toIntranet){
                const response = await api.post('/user/worker/authenticate', values);
                login(response.data.authToken.token);
                return history.replace('/intranet');
            } else {
                const response = await api.post('/user/authenticate', values);
                intranetLogin(response.data.authToken.token);
                return history.replace('/customer');
            }
           
        }
        catch({ response: {status} }) {
            if(status == 400) { setError('Email ou senha incorretos'); }
            if(status == 500) { setError('Oops! Ocorreu um erro inesperado'); }  
        }

    }

    return (
        <>


            <div className="container">

                <div className={`materialert danger ${!error ? 'hide': ''}`}>
                    <div className="material-icons">info</div>
                    {error}
                </div>

                <div className="row">
                    <div className="col s12 m7 offset-m3 l6 offset-l3 z-depth-6 card-panel box ">
                        <div className="container ">
                            <div className="section login-panel">
                                <h5 className="black-text center">{toIntranet? 'Acesso ao sistema interno' : 'Entre para continuar'}</h5>


                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className='row '>

                                        <div className='input-field col s12'>
                                            <InputComponent
                                                id="email" name="email" type="text"
                                                label="E-mail" className="validate"
                                                reference={register({
                                                    required: "Email é obrigatório",
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: "Email inválido"
                                                    }
                                                })}
                                                errorMessages={errors.email && errors.email.message}
                                            />
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='input-field col s12'>
                                            <InputComponent
                                                id="password" name="password" type="password"
                                                label="Senha" className="validate"
                                                reference={register({ required: "Digite uma senha" })}
                                                errorMessages={errors.password && errors.password.message}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <label className="right">
                                            <a><b >Esqueceu sua senha?</b></a>
                                        </label>
                                    </div>
                                    <div className='row'>
                                        <button type='submit' name='btn_login' className='col s12 waves-effect waves-light btn red darken-4'>Entrar</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="center">
                <p>Não possui conta? <Link to='/register'>Cadastre-se</Link></p>
            </div>
        </>
    )
}

export default Login;