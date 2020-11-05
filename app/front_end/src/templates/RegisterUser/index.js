import React, { useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { requests } from '../../API';
import InputComponent from '../../components/InputComponent';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import { useForm } from "react-hook-form";
import axios from 'axios';
import $ from 'jquery';
import M from "materialize-css";


const RegisterUser = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const onSubmit = values => console.log(values);

    
    const [cpf, setCpf] = useState('');
  
    
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const selectUfRef = useRef(null);

    useEffect(async () => {
        const response = await requests.get('/state');
        setStates(response.data);
        M.AutoInit();
    }, [])

    const getCities = async event => {
        const response = await requests.get('/state/' + event.target.value + '/city');
        setCities(response.data.cities);
        M.AutoInit();
    }

    const getAddress = async value => {
        const response = await axios.get(`https://viacep.com.br/ws/${value}/json/`, {
            headers: { 'Content-Type': 'application/json' }
        });    
        const { localidade, uf } = response.data;
        setCity(localidade);
        setUf(uf)
    }

    const uniqueCpf = async value => {
        const response = await requests.get('/user/search?cpf=' + value.replace(/\D/gim, ''));
        console.log(response.data.length > 0)
        return !response.data.length() > 0;
    }

    return (
        <div className="container">

            <div className="card-panel">
                <h4 className="center">Cadastro de cliente</h4>
                <div className="container">
                    
                        <div className="row">
                        <form onSubmit={handleSubmit(onSubmit)} >
                                <div className="row">
                                    <div className=" col m12 s12 ">
                                        <InputComponent
                                            name="name" type="text"
                                            reference={register({required: "Required",})}
                                            label="Nome completo" className="validate"
                                            errorMessages={errors.name && 'Este campo é obrigatório'}
                                        />
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col s12 m6">
                                        <InputComponent
                                            placeholder="xxx.xxx.xxx-xx" name="cpf"
                                             className="validate" label="CPF"
                                            reference={register({required: "Required", 
                                                validate: value => cpfValidator.isValid(value) 
                                                        && uniqueCpf(value)
                                                }
                                            )}
                                            // onChange={event => setCpf(event.target.value)}
                                            // value={cpf}
                                            errorMessages={errors.cpf && 'CPF inválido ou já cadastrado'}
                                        />
                                        


                                    </div>
                                    <div className="col s12 m6">
                                        <InputComponent
                                            name="birth_date" type="date"
                                            className="validate" label="Data de nascimento"
                                            ref={register({required: "Required" })}
                                            errorMessages={errors.birth_date && errors.birth_date.message}
                                        />
                                          
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s12 m6">
                                        <InputComponent
                                            id="password" name="password" type="password"
                                            className="validate" label="Senha"
                                            onChange={event => setPassword(event.target.value)}
                                            value={password}
                                            ref={register({required: "Required" })}
                                            errorMessages={errors.password && errors.password.message}
                                        />
                                        
                                    </div>
                                    <div className="col s12 m6">
                                        <InputComponent
                                            name="passwordconfirm"
                                            type="password" className="validate" label="Confirme a senha"
                                            ref={register({required: "Required", 
                                                validate: value => password === value 
                                            })}
                                            errorMessages={errors.passwordconfirm && errors.passwordconfirm.message}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s12 m6">
                                        <InputComponent
                                            name="email"
                                            type="text" className="validate" label="E-mail"
                                            ref={register({required: "Required", 
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Email inválido"
                                                }
                                            })}
                                            errorMessages={errors.email && errors.email.message}

                                        />
                                    </div>
                                    <div className="col s12 m6">
                                        <InputComponent
                                            placeholder="(xx) xxxxxxxxx" name="telephone"
                                            id="telephone" type="text" className="validate" label="Telefone"
                                            ref={register({required: "Required", 
                                                pattern: {
                                                    value: /^[0-9]{11-12}$/,
                                                    message: "Telefone inválido"
                                                }
                                            })}
                                            errorMessages={errors.telephone && errors.telephone.message}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col m6 s12">

                                        <InputComponent placeholder="xxxxx-xxx" name="zipcode"
                                            id="zipcode" type="text" className="validate"
                                            label="CEP"
                                            ref={register({required: "Required"})}
                                            errorMessages={errors.zipcode && errors.zipcode.message}
                                            onBlur={e => getAddress(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                    <div className="col s4 m2">
                                        

                                        <div className="input-field col s12">
                                            <select ref={selectUfRef} onChange={getCities}>
                                                {states.map((s, i) => (<option key={i} value={s.id} selected={uf == s.uf}>{s.uf}</option>))}
                                            </select>
                                            <label>UF</label>

                                        </div>

                                    </div>
                                    <div className="input-field col s8 m4">

                                        <select>
                                            {cities.map(c => (<option key={c.id} value={c.id} selected={city == c.name}>{c.name}</option>))}
                                        </select>
                                        <label>Cidade</label>
                                    </div>


                                </div>
                                <div className="row">
                                    <div className="col m6 s12">
                                        <InputComponent
                                            placeholder="Ex. Rua são joão" name="street"
                                            id="street" type="text" className="validate" label="Endereço"
                                        />

                                    </div>
                                    <div className="col m1 s4">

                                        <InputComponent id="num" type="number" name="num"
                                            className="validate" label="Nº"
                                        />

                                    </div>

                                    <div className=" col m5 s8">

                                        <InputComponent id="neighborhood" type="text"
                                            name="neighborhood" className="validate"
                                            label="Bairro"
                                        />

                                    </div>
                                </div>
                                </div>
                                <div className="row">
                                    <div className="col s12">
                                        <button className="btn waves-effect waves-light red darken-4 " type="submit" name="action">Próximo
                                    <i className="material-icons right">send</i>
                                        </button>
                                    </div>
                                </div>

                        </form>
                </div>
                </div>
            </div>
            </div>
           
      );
}

export default RegisterUser;