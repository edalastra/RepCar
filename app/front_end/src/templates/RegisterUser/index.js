import React, { useRef, useState, useEffect } from 'react';
import api from '../../api';
import InputComponent from '../../components/InputComponent';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import { withRouter } from 'react-router-dom';
import { useForm } from "react-hook-form";
import M from "materialize-css";
import { login } from '../../auth';


const RegisterUser =  (props) => {
    const { handleSubmit, register, errors, watch } = useForm();
    const onSubmit = async values => {
        const {name, email, telephone, cpf, birth_date, password, 
            zipcode, street, number, neighborhood, city_id} = values
        
        try {
            const response = await api.post('/user/register',
            {
                name, email, telephone, cpf, birth_date, password, type: 'customer',
                address: {
                    zipcode, street, number, neighborhood, complement: null, city_id
                }
            });
            if(response.status == 200) {
                login(response.authToken.token)
                props.history.push('/logged/customer/order-service')
            }
        } catch(err) {
            console.log(err)
        }
    };

    
    // const [cpf, setCpf] = useState('');
   
    // const [city, setCity] = useState('');
    // const [uf, setUf] = useState('');
    
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(async () => {
        const response = await api.get('/state');
        setStates(response.data);
        M.AutoInit();
    }, [])

    const getCities = async event => {
        const response = await api.get('/state/' + event.target.value + '/city');
        setCities(response.data.cities);
        M.AutoInit();
    }

    // const getAddress = async value => {
    //     const response = await axios.get(`https://viacep.com.br/ws/${value}/json/`, {
    //         headers: { 'Content-Type': 'application/json' }
    //     });    
    //     const { localidade, uf } = response.data;
    //     setCity(localidade);
    //     setUf(uf)
    // }

    const uniqueCpf = async value => {
        const response = await api.get('/user/?cpf=' + value.replace(/\D/gim, ''));
        return !response.data.length > 0;
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
                                            reference={register({required: "Este campo é obrigatório",})}
                                            label="Nome completo" className="validate"
                                            errorMessages={errors.name && errors.name.message}
                                        />
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col s12 m6">
                                        <InputComponent
                                            name="cpf" type="text"
                                            className="validate" label="CPF"
                                            reference={register({required: "Este campo é obrigatório", 
                                                validate: value => cpfValidator.isValid(value)
                                                && uniqueCpf(value) || "CPF já cadastrado"                    
                                                }
                                            )}
                                            // onChange={event => setCpf(event.target.value)}
                                            // value={cpf}
                                            errorMessages={errors.cpf && errors.cpf.message}
                                        />
                                        

                                    </div>
                                    <div className="col s12 m6">
                                        <InputComponent
                                            name="birth_date" type="date"
                                            className="validate" label="Data de nascimento"
                                            reference={register({required: "Este campo é obrigatório" })}
                                            errorMessages={errors.birth_date && errors.birth_date.message}
                                        />
                                          
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s12 m6">
                                        <InputComponent
                                            id="password" name="password" type="text"
                                            className="validate" label="Senha"
                                            reference={register({required: "Este campo é obrigatório" })}
                                            errorMessages={errors.password && errors.password.message}
                                        />
                                        
                                    </div>
                                    <div className="col s12 m6">
                                        <InputComponent
                                            name="passwordconfirm"
                                            type="text" className="validate" label="Confirme a senha"
                                            reference={register({required: "Este campo é obrigatório", 
                                                validate: value => value === watch('password') || "As senhas devem ser iguais"
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
                                            reference={register({required: "Este campo é obrigatório", 
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
                                            placeholder="ddxxxxxxxx" name="telephone"
                                            id="telephone" type="text" className="validate" label="Telefone"
                                            reference={register({required: "Este campo é obrigatório", 
                                                // pattern: {
                                                //     value: /^[0-9]{11-12}$/,
                                                //     message: "Telefone inválido"
                                                // }
                                            })}
                                            errorMessages={errors.telephone && errors.telephone.message}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col m6 s12">

                                        <InputComponent placeholder="xxxxxxxx" name="zipcode"
                                            id="zipcode" type="text" className="validate"
                                            label="CEP"
                                            reference={register({required: "Este campo é obrigatório"})}
                                            errorMessages={errors.zipcode && errors.zipcode.message}
                                        />
                                    </div>
                                    
                                    <div>
                                    <div className="col s4 m2">
                                        

                                        <div className="input-field col s12" >
                                            <select name="state" ref={register({})} onChange={getCities}>
                                                {states.map((s, i) => (<option key={i} value={s.id}>{s.uf}</option>))}
                                            </select>
                                            <label>UF</label>

                                        </div>

                                    </div>
                                    <div className="input-field col s8 m4">

                                        <select ref={register({})} name="city_id">
                                            {cities.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}
                                        </select>
                                        <label>Cidade</label>
                                    </div>


                                </div>
                                <div className="row">
                                    <div className="col m6 s12">
                                        <InputComponent
                                            reference={register({required: "Este campo é obrigatório" })}
                                            placeholder="Ex. Rua são joão" name="street"
                                            id="street" type="text" className="validate" label="Endereço"
                                            errorMessages={errors.street && errors.street.message}
                                        />

                                    </div>
                                    <div className="col m2 s4">
                                    
                                        <InputComponent id="num" type="number" name="number"
                                            className="validate" label="Nº"
                                            reference={register({required: "Este campo é obrigatório" })}
                                            errorMessages={errors.number && errors.number.message}
                                        />

                                    </div>

                                    <div className=" col m4 s8">
                                       
                                        <InputComponent id="neighborhood" type="text"
                                            name="neighborhood" className="validate"
                                            label="Bairro"
                                            reference={register({required: "Este campo é obrigatório" })}
                                            errorMessages={errors.neighborhood && errors.neighborhood.message}
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

export default withRouter(RegisterUser);