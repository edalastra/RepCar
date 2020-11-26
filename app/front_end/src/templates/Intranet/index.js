import React, { useEffect, useState } from 'react';
import * as format from 'date-format';

import { apiworker } from '../../api';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
  } from "react-router-dom";
import CardComponent from '../../components/CardComponent';


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
                    action={orders.service.vehicle.plate}
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
          sidebar: () => <div>home!</div>,
          main: () => <Services/>
        },
        {
          path: "/intranet/workers",
          sidebar: () => <div>bubblegum!</div>,
          main: () => <h2>Bubblegum</h2>
        },
      ];

  return (
      <>
   

    <Router>
        <div className="row">
            <div className="col-m4">
            <div style={{ display: "flex" }}>
            <div
            style={{
                padding: "10px",
                background: "#f0f0f0",
                height: '100%',
            }}
            >
            <ul style={{ listStyleType: "none", padding: 0 }}>
        
                <li>
                <Link to="/intranet/services">Serviços</Link>
                </li>
                <li>
                <Link to="/intranet/workers">Funcionários</Link>
                </li>
            </ul>

            <Switch>
                {routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    children={<route.sidebar />}
                />
                ))}
            </Switch>
            </div>

            <div style={{ flex: 1, padding: "10px" }}>
            <Switch>
                {routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    children={<route.main />}
                />
                ))}
            </Switch>
            </div>
        </div>
            </div>
        </div>
   
        </Router>
      </>
  );
}

export default withRouter(Intranet);