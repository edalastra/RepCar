import React from 'react';
import './style.css';

const SidenavComponent = ({ name, email, content}) => {
  return (
      <>

        <ul id="slide-out" className="sidenav">
        <li>
            <div className="user-view">
                <div className="background">
                    <div className="back-office" />
                </div>
                <a href="#user"><img className="circle" src="user.png" /></a>
                <a href="#name"><span className="white-text name">{name}</span></a>
                <a href="#email"><span className="white-text email">{email}</span></a>
            </div>
        </li>
        {content}
        </ul>
        <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
    </>
  );
}

export default SidenavComponent;