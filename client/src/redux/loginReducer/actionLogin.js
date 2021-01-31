import axios from 'axios';
import { SET_INITIAL_ITEMS, SET_INITIAL_CART } from '../cartReducer/action';

export const SET_USER = 'SET_USER';

export function setUser(user) {
    return async dispatch => {
        dispatch({
            type: SET_USER,
            payload: user,
        })

        localStorage.setItem('userId', user.id)
        
        if(user.id){
            let currentCart = {}
            await axios.get(`/orders/active/${user.id}`)
            .then(res => currentCart = res.data.length && res.data[0])
            .then(() => {
              if(!currentCart.state) {
                axios.post(`/orders/${user.id}`, {state: 'cart'})
                .then(() => {
                  let cart = JSON.parse(localStorage.getItem('cart'));
                  cart && cart.forEach( item => {
                    axios.post(`/orders/users/${user.id}/cart`, { id: item.id })
                  })
                })
                .then(() => localStorage.removeItem('cart'))
              }
      
              currentCart.state === 'created' && localStorage.removeItem('cart');
      
              if(currentCart.state === 'cart') {
                let cart = JSON.parse(localStorage.getItem('cart'));
                cart && cart.forEach( item => {
                  axios.post(`/orders/users/${user.id}/cart`, { id: item.id })
                })
                localStorage.removeItem('cart');
              }
            })

            let reduxCart = []
            await axios.get(`/orders/users/${user.id}/cart`)
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
          }
    }
}

