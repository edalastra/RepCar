import React from 'react';

// import { Container } from './styles';

const CardComponent = ({ title, text, action, notes }) => {
  return (
    
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
            <span class="card-title">{title}</span>
            <p>Descrição: {text}</p>
            <hr / >
            <p>Obs: {notes}</p>
        </div>
        <div class="card-action">
          {action}
        </div>
      </div>
  );
}

export default CardComponent;