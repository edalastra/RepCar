import React, { useState, useEffect } from 'react';
import M from 'materialize-css'
import InputComponent from '../../components/InputComponent';
import { useForm } from "react-hook-form";
import api from '../../api';
import { Animated } from "react-animated-css";

import Routes from '../../routes/Routes';

const Form = (props) => {

  // useEffect(() => {
  //   if (! props.match.params.vehicle_id) 
  //     return (<Redirect to="/logged/customer/order-service/vehicle-choice" />)

  // })

  const { handleSubmit, register, errors, watch } = useForm();

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
        ownerId: 1,
        modelId,
        year,
        placa,
        engineDescription
      }
    }))
  }


  return (
    <div className="container">
      <div className="card-panel">
        <h4 className="center">Agendar Serviço</h4>
        <div className="container">
          <div className="row">
            <form className="col s12" onSubmit={submit}>
              <div className="row">
                <div className="col m6 s12 ">
                  <InputComponent
                    id="date" type="date" name="date"
                    reference={register({ required: "Escolha uma data", })}
                    label="Data" className="validate"
                    errorMessages={errors.date && errors.date.message}
                  />
                </div>
                <div className=" col m6 s12 ">
                  <p>
                    <label>
                      <input name="shift" value="morning" type="radio" checked />
                      <span>Manhã</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input name="shift" value="afternoon" type="radio" />
                      <span>Tarde</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input name="shift" value="night" type="radio" />
                      <span>Noite</span>
                    </label>
                  </p>

                </div>
              </div>



              <div className="new-vehicle " hidden={!newVehicle} scale-transition scale-out>
                <div className="card-title">Novo veículo</div>


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

                  <InputComponent
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
            </form>
          </div>
        </div>
      </div>
    </div>

  )

}


const VehicleChoice = () => {
  const [vehicles, setVehicles] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [addVehicle, setAddVehicle] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/user/6/vehicles');
      setVehicles(data)
      M.AutoInit()
    })();
    (async () => {
      const { data } = await api.get('/vehicle/brands');
      setBrands(data);
      M.AutoInit();
    })();
  }, []);

  const { handleSubmit, register, errors, watch } = useForm();


  const listModels = async event => {
    const { data } = await api.get(`/vehicle/brands/${event.target.value}/models`);
    setModels(data);
    M.AutoInit();
  }

  const submit = async values => {
    console.log(values)
    const response = await api.post('/vehicle/register', values);
    console.log(response)
  }

  return (
    <>
    <form className="col s12" onSubmit={handleSubmit(submit)}>
    <div className="row">
       <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={!addVehicle}>
      <div className="input-field col s12 m6">
        <select  className="select-vehicle" name="vehicle_id">
          <option value disabled selected>Escolha as opções</option>
          {vehicles.map((ve, i) => <option key={i} value={ve.id}>
            {`${ve.model.brand.name} - ${ve.model.name} ${ve.year}`}
          </option>)}

        </select>
        <label>Veículos</label>
      </div>

      <button onClick={event => {
        event.preventDefault();
        setAddVehicle(add => !add);
        }}>Adicionar novo veiculo</button>
      </Animated>
      
      <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={addVehicle}>
      <div className="input-field col s12 m6">
        <div className="row">
          <div className="input-field col s12 m12">
            <select ref={register} className="select-brand" onChange={listModels}>
              <option value disabled selected >Escolha as opções</option>
              {brands.map((brand, i) => <option key={i} value={brand.id}>
                {brand.name}
              </option>)}
            </select>
            <label>Fabricante do veículo</label>
          </div>

          <div className="input-field col s12 m12">
            <select ref={register} className="select-brand" >
              <option value disabled selected>Escolha as opções</option>
              {models.map((model, i) => <option key={i} value={model.id}>
                {model.name}
              </option>)}
            </select>
            <label>Modelo</label>

          </div>
        </div>
        <div className="row">
          <div className="col m2 s4 ">

            <InputComponent
              id="year" type="number"
              name="year"
              className="validate" label="Ano"
              reference={register({ required: "Informe o ano do veículo" })}
              errorMessages={errors.year && errors.year.message}
            />
          </div>
          <div className="col m4 s8 ">
            <InputComponent
              id="placa" type="text"
              name="plate"
              className="validate" label="Placa" 
              reference={register({ required: "Informe a placa do veículo" })}
              errorMessages={errors.plate && errors.plate.message}/>
          </div>
         <button type="submit">Salvar</button>

        </div>
      </div>
      </Animated>
    </div>
    </form>
    </>
  )
}


const ServiceOrder = () => {
  return (
    <>
     
          <VehicleChoice />
          

     
    </>
  )
}


export default ServiceOrder;