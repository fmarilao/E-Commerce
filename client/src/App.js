import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routers/routes';


function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
