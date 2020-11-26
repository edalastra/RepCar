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
import HeaderComponent from '../components/HeaderComponent/index';
import FooterComponent from '../components/FooterComponent/index';
import { isAuthenticated, isWorker } from '../auth';
import Intranet from '../templates/Intranet';


const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isAuthenticated() ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  const IntranetRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
        isWorker() ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login/intranet",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

const Routes = () => {

    return(
       
    <Router>
        <HeaderComponent />
           
        <Switch>
            <Redirect exact from="/" to="/home" />
            <Route path="/home" component={Home} />
            <Route path="/register" component={RegisterUser} />
            <Route path="/login" component={Login} />
            <Route path="/login/intranet" component={Login} />
            <PrivateRoute path="/customer" component={ServiceOrder} />
            <IntranetRoute path="/intranet" component={Intranet} />
            
        </Switch>
        <FooterComponent />
    </Router>
    )

}

export default Routes;