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
import Customer from '../templates/Customer';
import HeaderComponent from '../components/HeaderComponent/index';
import FooterComponent from '../components/FooterComponent/index';
import IntranetRoute from './IntranetRoute';
import PrivateRoute from './PrivateRoute';
import { isAuthenticated, isWorker } from '../auth';
import Intranet from '../templates/Intranet';
import './style.css';

// const PrivateRoute = ({ component, ...rest }) => {
//     return (
//       <Route {...rest}> 
//         {isAuthenticated() ? <component /> : <Redirect to='/login'/>}
//       </Route>
//     )
//   }
//   const IntranetRoute = ({ component, ...rest }) => {
//     return (
//       <Route {...rest}> 
//       {isAuthenticated() ? <component /> : <Redirect to='/login/intranet'/>}
//     </Route>
      
//     );
//   }

const Routes = () => {

    return(
       
    <Router>
        <body>
        <HeaderComponent />
           <main>
        <Switch>
            <Redirect exact from="/" to="/home" />
            <Route exact path="/home" component={Home} />
            <Route restricted={false} exact path="/register" component={RegisterUser} />
            <Route exact path="/login" component={Login} >
              {!isAuthenticated() ? <Login /> : <Redirect to='/customer'/>}
            </Route>
            <Route exact path="/login/intranet" component={Login} >
              {!isWorker() ? <Login /> : <Redirect to='/intranet'/>}
            </Route>            
            <PrivateRoute restricted={true}  path="/customer" component={Customer} /> 
            <IntranetRoute  path="/intranet" component={Intranet}/> 
               
        </Switch>
        </main>
        <FooterComponent />
        </body>
    </Router>
    )

}

export default Routes;