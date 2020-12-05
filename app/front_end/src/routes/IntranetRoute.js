import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isWorker } from '../auth';

const IntranetRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isWorker() ?
                <Component {...props} />
            : <Redirect to="/login/intranet" />
        )} />
    );
};

export default IntranetRoute;