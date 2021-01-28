import React, {useEffect} from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/routes'
import axios from 'axios'

function App() {
  useEffect(() => {
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('userId');

    if(token){
      let currentCart = {}

      axios.get('/orders/active')
      .then(res => currentCart = res.data)
      .then(() => {
        if(!currentCart.state) {
          axios.post(`/orders/${userId}`, {state: 'cart'})
          .then(res => {
            let cart = JSON.parse(localStorage.getItem('cart'));
            cart && cart.forEach( item => {
              axios.post(`/orders/${res.data.id}/product/${item.id}`, item)
            })
          })
          .then(() => localStorage.removeItem('cart'))
        }

        currentCart.state === 'created' && localStorage.removeItem('cart');

        if(currentCart.state === 'cart') {
          let cart = JSON.parse(localStorage.getItem('cart'));
          cart && cart.forEach( item => {
            axios.post(`/orders/${currentCart.id}/product/${item.id}`, item)
          })
          localStorage.removeItem('cart');
        }
      })
    }
  })
  return (
    <BrowserRouter>
        <Routes />
    </BrowserRouter>
  );
}

export default App;