import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Routes from './routes/routes';
import { useDispatch, useSelector } from 'react-redux';
import { SET_INITIAL_CART, SET_INITIAL_ITEMS } from './redux/cartReducer/action';
import jwt from "jsonwebtoken";
import { setUser } from './redux/loginReducer/actionLogin.js'

function App() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.loginReducer.user)

   useEffect(() => {
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('userId');

    if (token) {
      const user = jwt.decode(token);
      console.log(user)
      if (user.user.email) {
        dispatch(setUser(user.user)); 
      }
    }

    if(token){
      let reduxCart = []
      axios.get(`/orders/users/${userId}/cart`)
      .then(res => {
        dispatch({type: SET_INITIAL_ITEMS, payload: res.data.length})
        return res.data       
      })
      .then(res => {
        res.forEach(item => {
          axios.get(`/products/${item.productId}`)
          .then(res => reduxCart.push(res.data))
          .then(() => dispatch({type: SET_INITIAL_CART, payload: reduxCart}))
        })
      })

      let currentCart = {}
      axios.get(`/orders/active/${userId}`)
      .then(res => currentCart = res.data.length && res.data[0])
      .then(() => {
        if(!currentCart.state) {
          axios.post(`/orders/${userId}`, {state: 'cart'})
          .then(() => {
            let cart = JSON.parse(localStorage.getItem('cart'));
            cart && cart.forEach( item => {
              axios.post(`/orders/users/${userId}/cart`, { id: item.id })
            })
          })
          .then(() => localStorage.removeItem('cart'))
        }

        currentCart.state === 'created' && localStorage.removeItem('cart');

        if(currentCart.state === 'cart') {
          let cart = JSON.parse(localStorage.getItem('cart'));
          cart && cart.forEach( item => {
            axios.post(`/orders/users/${userId}/cart`, { id: item.id })
          })
          localStorage.removeItem('cart');
        }
      })
    }
  }, [dispatch])

  return (
    <BrowserRouter>
        <Routes />
    </BrowserRouter>
  );
}

export default App;