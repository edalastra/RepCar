import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import { ValidatorForm } from 'react-form-validator-core';
import TextValidator from '../../components/TextValidator';
import axios from 'axios';
import $ from 'jquery';
import M from "materialize-css";


const RegisterUser = (props) => {


        const [name, setName] = useState('');
        const [cpf, setCpf] = useState('');
        const [email, setEmail] = useState('');
        const [birthDate, setBirthDate] = useState('');
        const [password, setPassword] = useState('');
        const [cPassword, setCPassword] = useState('');
        const [telephone, setTelephone] = useState('');
        const [cep, setCep] = useState('');
        const [cityId, setCityId] = useState('');
        const [address, setAddress] = useState('');
        const [num, setNum] = useState('');
        const [neighborhood, setNeighborhood] = useState('');
        const [UFs, setUFs] = useState([]);
        const [citys, setCitys] = useState([]);
    

        useEffect(() => {
            ValidatorForm.addValidationRule('confirmPassword', (value) => value === password); 
            ValidatorForm.addValidationRule('isCpf', (value) => cpfValidator.isValid(value));
            ValidatorForm.addValidationRule('uniqueCpf', (value) => unqueCpf(value)); 
        },[password]);
       
        useEffect(()=> {
            axios.get('http://localhost:8080/api/city/uf/list', {
                headers: {'Content-Type':'application/json'}
            })
            .then(res => {
                
                setUFs(res.data);
                M.AutoInit();
            })
            .catch(err => console.log(err.response));
        }, [])

        const getCitys = event =>  {
            axios.get('http://localhost:8080/api/city/list/'+event.target.value, {
                headers: {'Content-Type':'application/json'}
            })
            .then(res => {
                setCitys(res.data);
                M.AutoInit();
            })
            .catch(err => console.log(err.response));
        }

        const getAddress = event => {
            axios.get(`https://viacep.com.br/ws/${event.target.value}/json/`, {
                headers: {'Content-Type':'application/json'}
            })
            .then(res => {
                const { localidade } = res.data;
                setCityId(localidade)
            })
            .catch(err => console.log(err.response));
        } 

        const unqueCpf = value => 
            axios.post('http://localhost:8080/api/user/uniquecpf',{cpf:value},{
                headers: {'Content-Type':'application/json'}
            }).then(res => res.data.unque)
            .catch(err => console.log(err.response));
        

        const submit = () => {
            
            axios.post('http://localhost:8080/api/user/register',{
                    name,
                    cpf,
                    email,
                    birthDate,
                    password,
                    telephone,
                    cep,
                    cityId,
                    address,
                    num,
                    neighborhood,
                    type:'client'
            },  {
                headers: {'Content-Type':'application/json'}
            }, )
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
        }

        const refForm = useRef('form');



      const { errorMessages, validators, requiredError, validatorListener, value, ...rest } = props;
      return (
          <div className="container">
  
            <div className="card-panel">
            <h4 className="center">Cadastro de cliente</h4>
                <div className="container">
                    <div className="row">
                        <ValidatorForm className="col s12" onSubmit={submit} ref={refForm}
                            
                        >
                        <div className="row">
                            <div className=" col m12 s12 ">
                                <TextValidator 
                                    id="name" name="name" type="text" 
                                    label="Nome completo" className="validate"
                                    onChange={event => setName(event.target.value)}
                                    value={name}
                                    validators={['required','minStringLength:4']}
                                    errorMessages={['Este campo é obrigatório','Tamanho inválido']}
                                />
                            </div>
                            
                        </div>
                        <div className="row">
                            <div className="col s12 m6">
                                <TextValidator 
                                    placeholder="xxx.xxx.xxx-xx" name="cpf" id="first_name" 
                                    type="text" className="validate" label="CPF"
                                    onChange={event => setCpf(event.target.value)}
                                    value={cpf}
                                    validators={['required','isCpf','uniqueCpf']}
                                    errorMessages={['Este campo é obrigatório','CPF inválido', 
                                    'Este CPF já está vinculado à uma conta']}
                                />
                               
                            </div>
                            <div className="col s12 m6">
                                <TextValidator 
                                    id="birthDate" name="birthDate" type="date" 
                                    className="validate" label="Data de nascimento"
                                    onChange={event => setBirthDate(event.target.value)}
                                    value={birthDate}
                                    validators={['required']}
                                    errorMessages={['Este campo é obrigatório']}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12 m6">
                                <TextValidator 
                                    id="password" name="password" type="password" 
                                    className="validate" label="Senha"
                                    onChange={event => setPassword(event.target.value)}
                                    value={password}
                                    validators={['required','minStringLength:8','maxStringLength:16']}
                                    errorMessages={[
                                        'Este campo é obrigatório', 
                                        'A senha deve ter no minímo 8 caracteres',
                                        'A senha deve ter no máximo 16 caracteres'
                                    ]}
                                />
                            </div>
                            <div className="col s12 m6">
                                <TextValidator 
                                    id="cPassword" name="cPassword" 
                                    type="password" className="validate" label="Confirme a senha"
                                    onChange={event => setCPassword(event.target.value)}
                                    value={cPassword}
                                    validators={['required','confirmPassword']}
                                    errorMessages={['Este campo é obrigatório','As senhas não correspondem']}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12 m6">
                                <TextValidator 
                                    id="email" name="email" 
                                    type="text" className="validate" label="E-mail"
                                    onChange={event => setEmail(event.target.value)}
                                    value={email}
                                    validators={['required','isEmail']}
                                    errorMessages={['Este campo é obrigatório','E-mail inválido']}
                                />
                            </div>
                            <div className="col s12 m6">
                                <TextValidator 
                                    placeholder="(xx) xxxxxxxxx" name="telephone" 
                                    id="telephone" type="text" className="validate" label="Telefone"
                                    onChange={event => setTelephone(event.target.value)}
                                    value={telephone}
                                    validators={['required','matchRegexp:^[0-9]{10,11}$']}
                                    errorMessages={['Este campo é obrigatório','Telefone inválido']}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col m6 s12">
                            
                                <TextValidator placeholder="xxxxx-xxx" name="cep" 
                                    id="cep" type="text" className="validate" 
                                    label="CEP"
                                    onChange={event => setCep(event.target.value)}
                                    value={cep}
                                    validators={['required']}
                                    errorMessages={['Este campo é obrigatório']}
                                   
                                />
                            </div>
                            <div className="col s4 m2">
                            
                            <div className="input-field col s12">
                                    <select onChange={getCitys}>
                                        {UFs.map((uf,i) => (<option key={i} value={uf.uf} >{uf.uf}</option>))}
                                    </select>
                                    <label>UF</label>
                                   
                                </div>

                            </div>
                            <div className="input-field col s8 m4">
                            
                                    <select onChange={event => setCityId(event.target.value)}>
                                        {citys.map(ci => (<option key={ci.id} value={ci.id}>{ci.name}</option>))}
                                    </select>
                                    <label>Cidade</label>
                            </div>
                            
                            
                        </div>
                        <div className="row">
                            <div className="col m6 s12">
                                <TextValidator 
                                    placeholder="Ex. Rua são joão" name="address" 
                                    id="address" type="text" className="validate" label="Endereço"
                                    onChange={event => setAddress(event.target.value)}
                                    value={address}
                                    validators={['required']}
                                    errorMessages={['Este campo é obrigatório']}
                                    />
                               
                            </div>
                            <div className="col m1 s4">
                            
                                <TextValidator id="num" type="number" name="num" 
                                    className="validate" label="Nº"
                                    onChange={event => setNum(event.target.value)}
                                    value={num}
                                    validators={['required','minNumber:0']}
                                    errorMessages={['Este campo é obrigatório','Número Inválido']}
                                />
                                
                            </div>
                            
                            <div className=" col m5 s8">
                            
                                <TextValidator id="neighborhood" type="text" 
                                    name="neighborhood" className="validate" 
                                    label="Bairro"
                                    onChange={event => setNeighborhood(event.target.value)}
                                    value={neighborhood}
                                    validators={['required']}
                                    errorMessages={['Este campo é obrigatório']}
                                />

                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <button className="btn waves-effect waves-light red darken-4 " type="submit" name="action">Próximo
                                    <i className="material-icons right">send</i>
                                </button>
                            </div>
                        </div>
                        </ValidatorForm>
                    </div>
                </div>
            </div>
            </div>
      );
}

export default RegisterUser;