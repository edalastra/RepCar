import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Home from '../templates/Home/';
import RegisterUser from '../templates/RegisterUser';
import Login from '../templates/Login';
import Scheduling from '../templates/Scheduling';

const Routes = () => {

    return(
       
    <Router>
        <Switch>
            <Route path="/home" component={Home} />
            <Route path="/register" component={RegisterUser} />
            <Route path="/login" component={Login} />
            <Route path="/logged/client/scheduling" component={Scheduling} />
        </Switch>
    </Router>
    )

}

export default Routes;