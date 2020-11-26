import React, { useState, useEffect } from 'react';
import M from 'materialize-css'
import { withRouter } from 'react-router-dom';
import InputComponent from '../../components/InputComponent';
import { useForm } from "react-hook-form";
import api from '../../api';
import { Animated } from "react-animated-css";

import Routes from '../../routes/Routes';



const Form = ({ submit }) => {


  const { handleSubmit, register, errors, watch } = useForm();


  return (
      <div className="card-panel">
        <h4 className="center">Agendar Serviço</h4>
        
          <div className="row">
          <form className="col s12" onSubmit={handleSubmit(submit)}>
           
              <div className="row">
                <div className="col m6 s12 ">
                  <InputComponent
                    id="date" type="date" name="date"
                    reference={register({ required: "Escolha uma data", 
                      validate: value => new Date(value) >= new Date() || "Escolha uma data a partir de hoje"   
                      })}
                    label="Data" className="validate"
                    errorMessages={errors.date && errors.date.message}
                  />
                </div>
                <div className=" col m6 s12 ">
                  <p>
                    <label>
                      <input ref={register()} name="shift" value="morning" type="radio" checked />
                      <span>Manhã</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input ref={register()} name="shift" value="afternoon" type="radio" />
                      <span>Tarde</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input ref={register()} name="shift" value="night" type="radio" />
                      <span>Noite</span>
                    </label>
                  </p>

                </div>
              </div>



              <div className="row">
                <div className="col s12">

                  <InputComponent
                    name="description" type="text"
                    className="validate materialize-textarea" label="Descrição do(s) problema(s)"

                    reference={register({ required: "Informe a descrição do problema" })}
                    errorMessages={errors.description && errors.description.message} />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <InputComponent  
                    className="materialize-textarea" 
                    label="Observações"
                    name="notes"
                    reference={register({ required: "Informe a descrição do problema"})}
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
              </form>
          </div>
         
        </div>
  
  )

}


const VehicleChoice = ({ change }) => {
  const [vehicles, setVehicles] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [addVehicle, setAddVehicle] = useState(false);

  useEffect(() => {
    listVehicles();
    (async () => {
      const { data } = await api.get('/vehicle/brands');
      setBrands(data);
      M.AutoInit();
    })();
  }, []);

  const { handleSubmit, register, errors, watch } = useForm();

  const listVehicles = async () => {
    const { data } = await api.get('/user/6/vehicles');
    setVehicles(data)
    M.AutoInit()
  };

  const listModels = async event => {
    const { data } = await api.get(`/vehicle/brands/${event.target.value}/models`);
    setModels(data);
    M.AutoInit();
  }

  const submit = async values => {
    try {
      const response = await api.post('/vehicle/register', { ...values, owner_id: 6 });
      listVehicles();
      setAddVehicle(add => !add);
    } catch (err) { console.log(err.response) }

  }

  return (
    <>
     <div className="card-panel">
     <h4 className="center">Selecione ou adicione um veículo</h4>
     <div class="card-content">
      
        <div className="row">
        <form className="col s12" onSubmit={handleSubmit(submit)}>
          <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={!addVehicle}>
            <div hidden={addVehicle} className="input-field col s12">
              <select className="select-vehicle" onChange={e => change(e.target.value)}>
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
            <div hidden={!addVehicle} className="input-field col s12">
              <div className="row">
                <div className="input-field col s12 m12">
                  <select ref={register} className="select-brand" onChange={listModels} >
                    <option value disabled selected >Escolha as opções</option>
                    {brands.map((brand, i) => <option key={i} value={brand.id}>
                      {brand.name}
                    </option>)}
                  </select>
                  <label>Fabricante do veículo</label>
                </div>

                <div className="input-field col s12 m12">
                  <select ref={register} className="select-brand" name="model_id">
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
                    errorMessages={errors.plate && errors.plate.message} />
                </div>
                <button type="submit">Salvar</button>
              </div>
            </div>
          </Animated>
          </form>
        </div>
     
      </div>
      </div>
    </>
  )
}


const ServiceOrder = ({ history }) => {
  const [error, setError] = useState('');
  


  const [vehicle_id, setVehicle_id] = useState('')
  const submit = async values => {
    const { date, shift, description, notes } = values;
    try {
      const response = await api.post('/service/register',{
        date, shift, service: {
          vehicle_id, description, notes
        } 
      });
      history.push('/customer');
    } catch(err){
      if(err.response.status == 400) setError('Não temos funcionários para lhe atender nesse horário. Escolha outro.')
      if(err.response.status == 500) setError('Oops! Ocorreu um erro inesperado.')
    }

  }


  return (
    <>

      <div className={`materialert danger ${!error ? 'hide': ''}`}>
          <div className="material-icons">info</div>
          {error}
      </div>

      <div >
        <div className="row">
          <div className="col s12 m6">
            <VehicleChoice change={id => setVehicle_id(id)} />
          </div>
          <div className="col s12 m6">
            <Form submit={submit}/>
          </div>


        </div>

      </div>

    </>
  )
}


export default withRouter(ServiceOrder);