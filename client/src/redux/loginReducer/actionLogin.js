import axios from 'axios';
import { SET_INITIAL_ITEMS, SET_INITIAL_CART } from '../cartReducer/action';

export const SET_USER = 'SET_USER';
export const LOG_OUT_USER = 'LOG_OUT_USER';

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
                console.log("Estoy entrando al carrito")
                let cart = JSON.parse(localStorage.getItem('cart'));
                cart && cart.forEach( async item => {
                  console.log('Estoy posteando un producto')
                  await axios.post(`/orders/users/${user.id}/cart`, { id: item.id })
                })
                localStorage.removeItem('cart');
              }
            })
            .then(async () => {
              let reduxCart = []
              await axios.get(`/orders/users/${user.id}/cart`)
              .then(res => {
                console.log("Estoy seteando el numerito")
                console.log(res.data.length)
                dispatch({type: SET_INITIAL_ITEMS, payload: res.data.length})
                return res.data       
              })
              .then(res => {
                console.log("Voy a iterar los items para subir a redux")
                res.forEach(item => {
                  axios.get(`/products/${item.productId}`)
                  .then(res => {
                  console.log("Obtuve un producto y lo pushee para mandar a redux")
                    let newProd = res.data
                    newProd.localCounter = 1
                    reduxCart.push(newProd)})
                  .then(() => dispatch({type: SET_INITIAL_CART, payload: reduxCart}))
                })
              })
            })
          }
    }
}

export function logOutUser(){
  return dispatch => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    dispatch({
      type: LOG_OUT_USER
    })
  }
}

