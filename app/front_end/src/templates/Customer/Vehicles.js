import React, { useEffect, useState } from 'react';
import api from '../../api';
import AlertComponent from '../../components/AlertComponent';


const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [alert, setAlert] = useState({})
  
    useEffect(() => {
      (async () => {
        const response = await api.get('/user/vehicles');
        setVehicles(response.data);
      })();
    },[]);
  
    const deleteVehicle = async id => {
      const response = await api.delete(`/vehicle/${id}/delete`);
      setVehicles(vlist => vlist.filter(v => v.id !== id));
      setAlert({
        status: 'success',
        msg: 'Veículo deletado com sucesso'
      });
    }
  
    return (
      <>
        <AlertComponent msg={alert.msg} status={alert.status} />
        <h5 class="center-align">Veículos</h5>

        <ul class="collection">
          {vehicles.map((vehicle, index) => (
            <li key={index} class="collection-item">
              {`${vehicle.model.brand.name} - ${vehicle.model.name} ${vehicle.year} 
               ${vehicle.plate}`}
              <div style={{
                textAlign: 'right'
              }}>
                  <a onClick={() => deleteVehicle(vehicle.id)} class="btn-floating btn waves-effect waves-light red"><i class="material-icons">delete_forever</i></a>
  
              </div>
            </li>
          ))}
          
          
        </ul>
      </>
    )
  
}

export default Vehicles;