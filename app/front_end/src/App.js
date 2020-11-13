import React, { useEffect } from 'react';
import '../node_modules/materialize-css/dist/css/materialize.min.css'
import './alert.css';
import Routes from './routes/Routes';


import HeaderComponent from './components/HeaderComponent/index';
import FooterComponent from './components/FooterComponent/index';
import { AuthProvider } from './context/AuthContext';


const App = () => {

  return (
    <>
    
      <AuthProvider>

        <HeaderComponent />
      
          <Routes />
        <FooterComponent />

      </AuthProvider>
 
    </>
  );
}

export default App;
