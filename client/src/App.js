import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/routes'
import store from './store/index'
import { Provider } from 'react-redux';

function App() {
  return (
    <BrowserRouter>
      <React.StrictMode>
        <Provider store={store}>
          <Routes />
        </Provider>
      </React.StrictMode>
    </BrowserRouter>
  );
}

export default App;
