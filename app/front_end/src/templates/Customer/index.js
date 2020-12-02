import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import OrderService from '../ServiceOrder';
import SidenavComponent from '../../components/SidenavComponent';
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

const Checklist = () => {
  const { id } = useParams();
  const [alert, setAlert] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
      loadItems()
  }, [])

 const loadItems = async () => {
      const response = await api.get(`/service/order/${id}/item`);
      setItems(response.data);
  }


  return (<>

      <AlertComponent msg={alert.msg} status={alert.status} />
      <div className="row">
         <h3>Nota de serviço</h3>
      </div>
      <div className="row">
          <ul class="collection">
          <li className="collection-item">
              <span className="badge">
                  R${items.reduce((total, item) => total + item.price, 0).toFixed(2)}
              </span>Total                
          </li>
              {items.map((item, index) => (
                  <div>
                      <li key={index}  className="collection-item">
                          <span className="badge">R${item.price.toFixed(2)}</span>{item.description}                            
                      </li>
                  </div>
              ))}
          </ul>
      </div>
  </>)
}

const Services = () => {

  const [orders, setOrders] = useState([])

  useEffect(() => {
      (async () => {
          try {
              const response = await api.get('/user/services');
              console.log(response.data)
              setOrders(response.data)
          } catch (err) {
              console.log(err)
          }
      })()
  }, [])

  return (

      <>
          <div class="row">
              <ul className="collection">
              {orders.map((order, i) => 
                  <Link to={`/customer/checklist/${order.id}`}>
                     <a  class={`collection-item ${order.status !== 'finished' ? 'active': ''}`}>
                     <span class="badge">{order.status}
                      </span>{`${order.vehicle.model.brand.name} - ${order.vehicle.model.name}`}</a>
                  </Link>
                  
              )}
              </ul>
          </div>
      </>
  )
}

const Customer = () => {
  const routes = [
    {
      path: "/customer",
      exact: true,
      sidebar: () => <div>Serviços</div>,
      main: Services
    },
    {
      path: "/customer/checklist/:id",
      exact: true,
      sidebar: () => <div>Serviços</div>,
      main: Checklist
    },
    {
      path: "/customer/register-services",
      sidebar: () => <div>Agendar serviço</div>,
      main: OrderService
    },
    {
      path: "/customer/vehicles",
      sidebar: () => <div>Veículos</div>,
      
      main: Vehicles
    },
  ];

  const links = [
      {
        to: '/customer',
        label: 'Serviços'
      },
      {
          to: '/customer/register-services',
          label: 'Agendar Serviço'
      },
      {
          to: '/customer/vehicles',
          label: 'Veículos'
      }
  ]

  return (
    <>
        <SidenavComponent routes={routes} links={links}/>
    </>
  );
}

export default Customer;