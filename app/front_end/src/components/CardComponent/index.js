import React from 'react';

// import { Container } from './styles';

const CardComponent = ({ title, text, action, notes, status }) => {
  
  const colors = {
    pending: 'yellow lighten-3',
    finished: 'green lighten-2',
    canceled: 'red lighten-2'
  }

  return (
      <div className={`card ${colors[status]}`} >
        <div className="card-content black-text">
            <span className="card-title">{title}</span>
            <p>Descrição: {text}</p>
            <hr / >
            <p>Obs: {notes}</p>
        </div>
        <div className="card-action">
          {action}
        </div>
      </div>
  );
}

export default CardComponent;