import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/routes'

function App() {
  return (
    <BrowserRouter>
      <React.StrictMode>
          <Routes />
      </React.StrictMode>
    </BrowserRouter>
  );
}

export default App;