import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/routes';
import { useDispatch } from 'react-redux';
import jwt from "jsonwebtoken";
import { setUser } from './redux/loginReducer/actionLogin.js'
import axios from 'axios'

function App() {

  const dispatch = useDispatch();

   useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      const user = jwt.decode(token);
      if (user.email) {
        dispatch(setUser(user));
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    }
  }, [dispatch])

  return (
    <BrowserRouter>
        <Routes />
    </BrowserRouter>
  );
}

export default App;