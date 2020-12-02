import React from 'react';
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import ButtonBackComponent from '../buttonBackComponent'

const SidenavComponent = ({ routes, links}) => {
  return (
    <>
    <ButtonBackComponent />
    <Router>
    <div className="row">
        <div className="col-m4">
        <div style={{ display: "flex" }}>
        <div
        style={{
            padding: "10px",
            background: "#f0f0f0",
            height: '100%',
            width: '15%'
        }}
        >
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {links.map((link, index) => (
            <li key={index} >
              <Link to={link.to}>{link.label}</Link>
            </li>
          ))}
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

export default SidenavComponent;