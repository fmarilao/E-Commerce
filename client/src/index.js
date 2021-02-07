import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import store from './redux/store.js'
import {Provider} from 'react-redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const token = localStorage.getItem('token');
axios.defaults.baseURL = 'http://localhost:3001'
axios.defaults.headers.common["x-access-token"] = token;

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#F4E6E3',
    },
    secondary: {
      main: '#C9002D',
      darker: '#932020',
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
