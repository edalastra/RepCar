import React, { useEffect } from 'react';
import '../node_modules/materialize-css/dist/css/materialize.min.css'
import './alert.css';
import Routes from './routes/Routes';
import HeaderComponent from './components/HeaderComponent/index';
import FooterComponent from './components/FooterComponent/index';

const App = () => {

  return (
    <>
      
        <HeaderComponent />
          <Routes />
     
        <FooterComponent />
     
     
    </>
  );
}

export default App;
