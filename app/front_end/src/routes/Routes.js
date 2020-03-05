import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Home from '../templates/Home/';
import RegisterUser from '../templates/RegisterUser';

const Routes = () => {

    return(
       
    <Router>
        <Switch>
            <Route path="/home" component={Home} />
            <Route path="/register" component={RegisterUser} />
        </Switch>
    </Router>
    )

}

export default Routes;