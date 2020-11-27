import React, { useEffect, useState } from 'react';
import * as format from 'date-format';
import SidenavComponent from '../../components/SidenavComponent';
import CardComponent from '../../components/CardComponent';
import { apiworker } from '../../api';

const Services = () => {
    
    const [orders, setOrders] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const response = await apiworker.get('/services/worker/');
                console.log(response.data)
                setOrders(response.data)
            } catch(err) {
                console.log(err)
            }
            })()
        },[])

        
    return(

        <>

        <div class="row">
            {orders.map((order, i) => 
             <div class="col s12 m4 ">
                <CardComponent key={i}
                    title={`${format('dd/MM', new Date(order.date))} - ${order.shift}`}
                    text={order.service.description}
                    notes={order.service.notes}
                    action={order.vehicle.model.name}
                />
            </div>
            )}
        </div>
        </>
    )
}


const Intranet = () => {
    const [user, setUser] = useState({})
    useEffect(() => {
    (async () => {
        try {
            const response = await apiworker.get('/user/worker/me');
            console.log(response.data)
            setUser(response.data);
        } catch(err) {
            console.log(err)
        }
        })()
    },[])
    const { name, email } = user

  
    const routes = [
        {
          path: "/intranet/services",
          exact: true,
          sidebar: () => <div>Serviços</div>,
          main: () => <Services/>
        },
        {
          path: "/intranet/workers",
          sidebar: () => <div>bubblegum!</div>,
          main: () => <h2>Bubblegum</h2>
        },
      ];

      const links = [
          {
              to: '/intranet/services',
              label: 'Serviços'
          },
          {
              to: '/intranet/workers',
              label: 'Funcionários'
          }
      ]


  return (
      <>
        <SidenavComponent 
            routes={routes}
            links={links}
        />
      </>
  );
}

export default Intranet;