import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    
  } from "react-router-dom";
import Home from '../templates/Home/';
import RegisterUser from '../templates/RegisterUser';
import Login from '../templates/Login';
import ServiceOrder from '../templates/ServiceOrder';
import Customer from '../templates/Customer';
import HeaderComponent from '../components/HeaderComponent/index';
import FooterComponent from '../components/FooterComponent/index';
import { isAuthenticated, isWorker } from '../auth';
import Intranet from '../templates/Intranet';
import './style.css';

const PrivateRoute = ({ component, ...rest }) => {
    return (
      <Route {...rest}
      component={isAuthenticated() ? component : <Redirect to='/login'/>}
      
      />
    )
  }
  const IntranetRoute = ({ component, ...rest }) => {
    return (
      <Route {...rest} 
        component={isWorker() ? 
        component : <Redirect to='/login/intranet'/>}
      />
      
    );
  }

const Routes = () => {

    return(
       
    <Router>
        <body>
        <HeaderComponent />
           <main>
        <Switch>
            <Redirect exact from="/" to="/home" />
            <Route path="/home" component={Home} />
            <Route exact path="/register" component={RegisterUser} />
            <Route exact path="/login" component={Login} >
              {!isAuthenticated() ? <Login /> : <Redirect to='/customer'/>}
            </Route>
            <Route exact path="/login/intranet" component={Login} >
              {!isWorker() ? <Login /> : <Redirect to='/intranet'/>}
            </Route>            
            <PrivateRoute  path="/customer" component={Customer} /> 
            <IntranetRoute path="/intranet" component={Intranet}/> 
               
        </Switch>
        </main>
        <FooterComponent />
        </body>
    </Router>
    )

}

export default Routes;