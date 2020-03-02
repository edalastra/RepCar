import React from 'react';


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
