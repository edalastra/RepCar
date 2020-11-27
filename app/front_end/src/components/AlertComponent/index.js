import React from 'react';


const AlertComponent = ({ msg, status }) => {
  return (
    <div className={`materialert ${status} ${!msg ? 'hide': ''}`}>
    <div className="material-icons">info</div>
        {msg}
    </div>
  );
}

export default AlertComponent;