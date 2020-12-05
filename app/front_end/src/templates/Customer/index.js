import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import OrderService from './ServiceOrder';
import SidenavComponent from '../../components/SidenavComponent';
import api from '../../api';
import AlertComponent from '../../components/AlertComponent';
import Vehicles from './Vehicles';
import { Services, Checklist } from './Services';



const Customer = () => {

  const [user, setUser] = useState({
});

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/user');
      console.log(data)
      setUser(data);
    })();
  },[]);

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
        <SidenavComponent user={user} routes={routes} links={links}/>
    </>
  );
}

export default Customer;