import React from 'react';
import { useForm } from "react-hook-form";

import './style.css';
import ModalComponent from '../ModalComponent';
import InputComponent from '../InputComponent';
import api from '../../api';
import { Redirect } from 'react-router-dom';


const HeaderComponent = () => {



    return (
        <>



            <nav>
                <div className="nav-wrapper grey darken-4">
                    <a href="#!" className="brand-logo"><img src="logo.png" alt="logo" className="logo-image" /></a>
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        <li><a href="sass.html">Sobre</a></li>
                        <li><a href="badges.html">Contato</a></li>
                        <li><a href="collapsible.html">Serviços</a></li>
                        <li><IntranetLogin/></li>
                    </ul>

                </div>
            </nav>



            <ul className="sidenav" id="mobile-demo">
                <li><a href="sass.html">Sobre</a></li>
                <li><a href="badges.html">Contato</a></li>
                <li><a href="collapsible.html">Serviços</a></li>
                <li><IntranetLogin/></li>
            </ul>
        </>
    )

}

const IntranetLogin = props => {
    const { handleSubmit, register, errors, watch } = useForm();

    const onSubmit = async values => {
        const response = await api.post('/user/worker/authenticate', values);
        console.log(response)
        if(response.status == '200') {
            return <Redirect to='/intranet'/>
        }
    }

    return (

        <ModalComponent
            buttonLabel="Interno"
            header="Acesso ao sistema interno"
            content={(
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
            )}
        />
    )
}

export default HeaderComponent;