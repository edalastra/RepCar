import React, { useState, useEffect, useRef } from 'react';
import M from 'materialize-css'
import { withRouter } from 'react-router-dom';
import InputComponent from '../../components/InputComponent';
import { useForm } from "react-hook-form";
import api from '../../api';
import { Animated } from "react-animated-css";

import AlertComponent from '../../components/AlertComponent';
import DatepickerComponent from '../../components/DatepickerComponent';

const Form = ({ submit }) => {

  const { handleSubmit, register, errors, watch } = useForm();

return (
  <div className="card-panel">
    <h4 className="center">Agendar Serviço</h4>

    <div className="row">
      <form className="col s12" onSubmit={handleSubmit(submit)}>

        <div className="row">
          <div className="col s12 ">
            <DatepickerComponent label="Escolha uma das datas disponíveis" 
              name="date" 
              reference={register({required: 'Escolha uma  data'})} />
          </div>
        </div>

        <div className="row">
          <div class="input-field col s12">
            <textarea class="materialize-textarea"
              id="description"
              name="description" type="text"
              className="validate materialize-textarea"
              ref={register({ required: "Informe a descrição do problema" })}
              errorMessages={errors.description && errors.description.message}
            ></textarea>
            <label for="description">Descrição do(s) problemas</label>
          </div>
        </div>
        <div className="row">
          <div class="input-field col s12">
            <textarea class="materialize-textarea"
              id="notes"
              type="text"
              className="validate materialize-textarea"
              name="notes"
              ref={register()}
            ></textarea>
            <label htmlFor="notes">Observações</label>
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
  const [alert, setAlert] = useState({});

  const initSelect = () => {
    const elems = document.querySelectorAll('select');
    const instances = M.FormSelect.init(elems, {});
  }

  useEffect(() => {
    listVehicles();
    (async () => {
      const { data } = await api.get('/vehicle/brands');
      setBrands(data);
      initSelect()
    })();
  }, []);

  const { handleSubmit, register, errors, watch } = useForm();


  const listVehicles = async () => {
    const { data } = await api.get('/user/vehicles');
    setVehicles(data)
    initSelect()
  };

  const listModels = async event => {
    const { data } = await api.get(`/vehicle/brands/${event.target.value}/models`);
    setModels(data);
    initSelect()
  }


  const submit = async values => {
    try {
      const response = await api.post('/vehicle/register', { ...values, owner_id: 6 });
      listVehicles();
      setAddVehicle(add => !add);
      setAlert({
        status: 'success',
        msg: 'Veículo registrado com sucesso'
      });
    } catch (err) { console.log(err.response) }

  }

  return (
    <>
      <AlertComponent status={alert.status} msg={alert.msg} />
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
      const response = await api.post('/service/register', {
        date, shift, vehicle_id, service: {
          description, notes
        }
      });
      console.log(response)
      history.push('/customer');
    } catch (err) {
      console.log(err.response)
      if (err.response.status == 400) setError('Não temos funcionários para lhe atender nesse horário. Escolha outro.')
      if (err.response.status == 500) setError('Oops! Ocorreu um erro inesperado.')
    }

  }


  return (
    <>
      <h5 class="center-align">Agendar Serviço</h5>

      <div className={`materialert danger ${!error ? 'hide' : ''}`}>
        <div className="material-icons">info</div>
        {error}
      </div>

      <div >
        <div className="row">
          <div className="col s12 m6">
            <VehicleChoice change={id => setVehicle_id(id)} />
          </div>
          <div className="col s12 m6">
            <Form submit={submit} />
          </div>


        </div>

      </div>

    </>
  )
}


export default withRouter(ServiceOrder);