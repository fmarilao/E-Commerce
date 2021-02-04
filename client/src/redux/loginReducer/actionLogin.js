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
                  localStorage.removeItem('cart')
                  
                  const promisesOne = cart && cart.map(item => {
                    return new Promise((resolve, reject) => {
                      resolve(axios.post(`/orders/users/${user.id}/cart`, { id: item.id }))
                    })
                  })
                  Promise.all(promisesOne || [])
                  .then(
                    () => {
                    axios.get(`/orders/users/${user.id}/cart`)
                    .then(res => {
                      dispatch({type: SET_INITIAL_ITEMS, payload: res.data.length})
                      return res.data
                    })
                    .then(res => {
                      let reduxCart = []
                      const promises = res.map(item => {
                        return new Promise((resolve, reject) => {
                          resolve(
                            axios.get(`/products/${item.productId}`)
                            .then(res => {
                              let newProd = res.data
                              newProd.localCounter = 1
                              reduxCart.push(newProd)})
                            )
                        })
                      })
                      Promise.all(promises)
                        .then(() => dispatch({type: SET_INITIAL_CART, payload: reduxCart}))
                      })
                      
                    })
                    .catch(err => console.log(err))
                })
              }
      
              currentCart.state === 'created' && localStorage.removeItem('cart');
      
              if(currentCart.state === 'cart') {
                let cart = JSON.parse(localStorage.getItem('cart'));
                localStorage.removeItem('cart');
                const promises = cart && cart.map(item => {
                  return new Promise((resolve, reject) => {
                  resolve(axios.post(`/orders/users/${user.id}/cart`, { id: item.id }))
                  })
                })
                Promise.all(promises || [])
                .then(
                  () => {
                  axios.get(`/orders/users/${user.id}/cart`)
                  .then(res => {
                    dispatch({type: SET_INITIAL_ITEMS, payload: res.data.length})
                    return res.data
                  })
                  .then(res => {
                    let reduxCart = []
                    const promises = res.map(item => {
                      return new Promise((resolve, reject) => {
                        resolve(
                          axios.get(`/products/${item.productId}`)
                          .then(res => {
                            let newProd = res.data
                            newProd.localCounter = 1
                            reduxCart.push(newProd)})
                          )
                      })
                    })
                    Promise.all(promises)
                      .then(() => dispatch({type: SET_INITIAL_CART, payload: reduxCart}))
                    })
                    
                  })
                
              }
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

