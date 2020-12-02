import React from 'react';
import { useHistory } from 'react-router-dom';

// import { Container } from './styles';

const ButtonBackComponent = () => {
const history = useHistory()
  return (
    <button onClick={() => history.goBack()}><i class="small material-icons">arrow_back</i></button>
  );
}

export default ButtonBackComponent;