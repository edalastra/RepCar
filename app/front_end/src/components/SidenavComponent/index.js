import React, { useEffect, useRef } from 'react';
import M from 'materialize-css';
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import ButtonBackComponent from '../buttonBackComponent'
import { logout } from '../../auth';

const SidenavComponent = ({ routes, links, user }) => {

  useEffect(() => {
    const sidenav = document.querySelector('#slide-out');
    M.Sidenav.init(sidenav, {});
  },
    [])
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
                  width: '10%'
                }}
              >

                <ul id="slide-out" className="sidenav" >
                  <li><div className="user-view">
                    <div className="background back-office">
                    </div>
                    <a><img className="circle" src="user.png" /></a>
                    <a><span className="white-text name">{user.name}</span></a>
                    <a><span className="white-text email">{user.email}</span></a>
                    <a onClick={() => { 
                      logout();
                      window.location.reload();
                      }}><span className="waves-effect white-text">Sair</span></a>

                  </div></li>
                  {links.map((link, index) => (
                    <li  key={index} >
                      <Link className="sidenav-close" to={link.to}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
                <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>

              </div>

              <div   style={{ flex: 1, padding: "10px" }}>
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