import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import Home from '../templates/Home/';
import RegisterUser from '../templates/RegisterUser';
import Login from '../templates/Login';
import ServiceOrder from '../templates/ServiceOrder';
import Customer from '../templates/Customer';


const Routes = () => {

    return(
       
    <Router>
        <Switch>
            <Redirect exact from="/" to="/home" />
            <Route path="/home" component={Home} />
            <Route path="/register" component={RegisterUser} />
            <Route path="/login" component={Login} />
            <Route path="/logged/customer/order-service" component={ServiceOrder} />
        </Switch>
    </Router>
    )

}

export default Routes;