import React, {useEffect, useState} from 'react';
import TextValidator from '../../components/TextValidator';
import axios from 'axios';
import M from 'materialize-css';
import $ from 'jquery';
import ValidatorForm from 'react-form-validator-core/lib/ValidatorForm';


const Scheduling = (props) => {

    const [vehicles, setVehicles] = useState([]);
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [year, setYear] = useState('');
    const [placa, setPlaca] = useState('');
    const [description, setDescription] = useState('');
    const [ps, setPs] = useState('');
    const [newVehicle, setNewVehicle] = useState(false);
    const [modelId, setModelId] = useState('');
    const [vehicleId, setVehicleId] = useState('');
    const [engineDescription, setEngineDescription] = useState('');
    const [area, setArea] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
      ValidatorForm.addValidationRule('minDate', (value) => new Date(value) >= Date.now());
      ValidatorForm.addValidationRule('notSunday', (value) => new Date(value).getDay() != 6);
      ValidatorForm.addValidationRule('validTime', (value) => value.split(':')[0] >= 8
        && value.split(':')[0] <= 18 );
    

        axios.post('http://localhost:8080/api/vehicle/list', {userId:1}, {
            headers: {'Content-Type':'application/json'}
        })
        .then(res => {
            setVehicles(res.data);
            M.AutoInit();
        })
        .catch(err => console.log(err.response));
    }, []);


    const listBrands = () => {
        axios.get('http://localhost:8080/api/vehicle/brands/list', {
          headers: {'Content-Type':'application/json'}
      })
      .then(res => {
          setBrands(res.data);
          M.AutoInit();
      })
      .catch(err => console.log(err.response));
    }

    const listModels = event => {

      console.log(event.target.value)
      axios.get('http://localhost:8080/api/vehicle/models/list'+event.target.value, {
        headers: {'Content-Type':'application/json'}
    })
    .then(res => {
        setModels(res.data);
        M.AutoInit();
    })
    .catch(err => console.log(err.response));
  }

  const submit = () => {

    console.log(JSON.stringify({
      date,
      time,
      area,
      type,
      description,
      ps,
      newVehicle,
      vehicleId,
      addVehicle: {
        ownerId:1,
        modelId,
        year,
        placa,
        engineDescription
      }
    }))  
  }

    const { errorMessages, onError, validators, requiredError, validatorListener, value, ...rest } = props;
  
    return(
        <div className="container">
  <div className="card-panel">
    <h4 className="center">Agendar Serviço</h4>
    <div className="container">
      <div className="row">
        <ValidatorForm className="col s12" onSubmit={submit}>
          <div className="row">
            <div className="col m6 s12 ">
              <TextValidator 
                id="date" type="date"
                className="validate" label="Data"
                onChange={event => setDate(event.target.value)}
                value={date}
                validators={['required','minDate','notSunday']}
                errorMessages={['Este campo é obrigatório',
                'Escolha uma data a partir do próximo dia útil',
                'Desculpe, não atendemos no domingo']} />
            </div>
            <div className=" col m6 s12 ">
              <TextValidator 
                id="time" type="time"
                className="validate" label="Hora"
                onChange={event => setTime(event.target.value)}
                value={time}
                validators={['required','validTime']}
                errorMessages={['Este campo é obrigatório',
                'Desculpe, não atendemos neste horário']} />
            </div>
          </div>
          
         <div className="row">
            <div className="input-field col s12 m6">
                <select className="select-vehicle" onChange={event => setVehicleId(event.target.value)}>
                <option value disabled selected>Escolha as opções</option>
                  {vehicles.map((ve,i) => <option key={i} value={ve.id}>
                    {`${ve.brand} - ${ve.model} ${ve.year}`}
                    </option>)}
                </select>
                <label>Veículos</label>
            </div>
            <div className="input-field col s12 m6">
                <button className="btn red darken-4" type="button" onClick={() => {
                  setNewVehicle(o => !o);
                  listBrands()
                  }}>
                  Adicionar novo veículo</button>
            </div>
            </div>
            
            <div className="new-vehicle " hidden={!newVehicle} scale-transition scale-out>
              <div className="card-title">Novo veículo</div>
              <div className="row">
              <div className="input-field col s12 m6">
              <select className="select-brand" onChange={listModels}>
                <option value disabled selected >Escolha as opções</option>
                  {brands.map((b,i) => <option key={i} value={b.id}>
                    {b.name}
                    </option>)}
                </select>
                <label>Fabricante do veículo</label>
               
              </div>
              <div className="input-field col s12 m6">
              <select className="select-brand" onChange={event => setModelId(event.target.value)}>
                <option value disabled selected>Escolha as opções</option>
                  {models.map((m,i) => <option key={i} value={m.id}>
                    {m.name}
                    </option>)}
                </select>
                <label>Modelo</label>
                
              </div>
            </div>
            <div className="row">
              <div className="col m2 s4 ">

                <TextValidator 
                id="year" type="number"
                name="year"
                className="validate" label="Ano"
                onChange={event => setYear(event.target.value)}
                value={year}
                validators={newVehicle ? ['required'] : []}
                errorMessages={newVehicle ? ['Este campo é obrigatório'] : []} />
              </div>
              <div className="col m4 s8 ">
              <TextValidator 
                id="placa" type="text"
                name="placa"
                className="validate" label="Placa"
                onChange={event => setPlaca(event.target.value)}
                value={placa}
                validators={newVehicle ? ['required','matchRegexp:^[A-Za-z]{3}[A-Za-z0-9]{4}$'] : []}
                errorMessages={newVehicle ? ['Este campo é obrigatório','Valor inválido'] : []} />
              </div>
              <div className="input-field col m6 s12 ">
                <input placeholder="Ex. 1.4 8v" id="description" type="text" 
                className="validate" onChange={event => setEngineDescription(event.target.value)} value={engineDescription} />
                <label htmlFor="description">Descição do motor</label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12 m6">
              <select onChange={event => setArea(event.target.value)}>
                <option value disabled selected>Escolha as opções</option>
                <option value={1}>Motor</option>
                <option value={2}>Eletrica</option>
                <option value={3}>Suspenção</option>
                <option value={4}>Escapamento</option>
              </select>
              <label>Áreas</label>
            </div>
            <div className="input-field col s12 m6">
              <select onChange={event => setType(event.target.value)}>
                <option value disabled selected>Escolha as opções</option>
                <option value={1}>Preventiva</option>
                <option value={2}>Corretiva</option>
              </select>
              <label>Tipos de Serviço</label>
            </div>
          </div>
          <div className="row">
            <div className="col s12">

              <TextValidator 
                id="problem-description" type="text"
                className="validate materialize-textarea" label="Descrição do(s) problema(s)"
                onChange={event => setDescription(event.target.value)}
                value={description}
                validators={['required',]}
                errorMessages={['Este campo é obrigatório']} />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <textarea onChange={event => setPs(event.target.value)} id="observations" className="materialize-textarea" defaultValue={""} />
              <label htmlFor="observations">Observações</label>
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

    )

}

export default Scheduling