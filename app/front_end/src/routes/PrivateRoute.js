import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth';

const PrivateRoute = ({component: Component, restricted, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            !isAuthenticated() ?
                <Redirect to="/login" />
            : <Component {...props} />
        )} />
    );
};

export default PrivateRoute;