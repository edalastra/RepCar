import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Home from '../templates/Home/index';

const Routes = () => {

    return(
       
    <Router>
        <Switch>
            <Route path="/home" >
                <Home />
            </Route>
        </Switch>
    </Router>
    )

}

export default Routes;