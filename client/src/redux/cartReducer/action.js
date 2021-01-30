import axios from "axios";

// import axios from 'axios';
export const ADD_PRODUCT_CART = 'ADD_PRODUCT_CART';
export const REMOVE_PRODUCT_CART = 'REMOVE_PRODUCT_CART';
export const UPDATE_PRODUCT_CART = 'UPDATE_PRODUCT_CART';
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';
const isLogged = false;
// const userId = JSON.parse(localStorage.getItem("UserId"));

export function addItem(newProduct, userId) {
  return function (dispatch) {
    if (isLogged) {
      axios.post(`/order/addproduct/${userId}`, newProduct).then((res) =>
        dispatch({
          type: ADD_PRODUCT_CART,
          payload: newProduct,
        })
      );
    }
    else{
      let cart  = JSON.parse(localStorage.getItem("cart"))
      if(cart){
        if(!cart.find(item => item.id === newProduct.id)){
          let newCart = JSON.stringify(cart.concat(newProduct))
          localStorage.setItem('cart', newCart);
        }
      }
      else{
        let newCart = JSON.stringify([newProduct])
        localStorage.setItem('cart', newCart);
      }
    }
    dispatch({
      type: INCREMENT_COUNTER,
    })
  };
}


export function removeItem(deleteProduct, userId){
  return function(dispatch){
    if(isLogged){
      axios.get(`/orders/active/${userId}`).then(res => res.data.id)
      .then(res => {
        axios.delete(`/orders/${res}/deleteProduct/`, deleteProduct)
      })
      .then((res) =>
        dispatch({
          type: REMOVE_PRODUCT_CART,
          payload: deleteProduct,
        })
      );
     
    }
    else{
      let cart = JSON.parse(localStorage.getItem("cart"))
      cart = JSON.stringify(cart.filter((e) => e.id !== deleteProduct.id));
      localStorage.setItem('cart', cart);
    }
    dispatch({
      type: DECREMENT_COUNTER,
    })
  }
}

export const increaseProduct = (item) => (dispatch, getState) => {
   if(isLogged){
      axios.get(`/orders/active/${userId}`).then(res => res.data.id)
      .then(res => {
        axios.delete(`/orders/${res}/deleteProduct/`, deleteProduct)
      })
      .then((res) =>
        dispatch({
          type: REMOVE_PRODUCT_CART,
          payload: deleteProduct,
        })
      );   
    }
    else{
      let actualCart = JSON.parse(localStorage.getItem("cart"))
      let newCart = actualCart.filter((i) => i.id !== item.id)
      item.localCounter = item.localCounter +1
      localStorage.setItem('cart', JSON.stringify(newCart.concat(item))) 
    }}

    export const decreaseProduct = (item) => (dispatch, getState) => {
      if(isLogged){
         // axios.get(`/orders/active/${userId}`).then(res => res.data.id)
         // .then(res => {
         //   axios.delete(`/orders/${res}/deleteProduct/`, deleteProduct)
         // })
         // .then((res) =>
         //   dispatch({
         //     type: REMOVE_PRODUCT_CART,
         //     payload: deleteProduct,
         //   })
         // );   
       }
       else{
         let actualCart = JSON.parse(localStorage.getItem("cart"))
         let newCart = actualCart.filter((i) => i.id !== item.id)
         if (item.localCounter > 1) {
           item.localCounter = item.localCounter -1
         }else{
          return localStorage.setItem('cart', JSON.stringify(newCart))
         }
         localStorage.setItem('cart', JSON.stringify(newCart.concat(item))) 
       }}