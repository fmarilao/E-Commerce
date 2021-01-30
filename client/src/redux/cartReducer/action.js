import axios from "axios";

export const ADD_PRODUCT_CART = 'ADD_PRODUCT_CART';
export const REMOVE_PRODUCT_CART = 'REMOVE_PRODUCT_CART';
export const UPDATE_PRODUCT_CART = 'UPDATE_PRODUCT_CART';
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';
export const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY';
export const DECREMENT_QUANTITY = 'DECREMENT_QUANTITY';
export const SET_INITIAL_CART = 'SET_INITIAL_CART';
export const SET_INITIAL_ITEMS = 'SET_INITIAL_ITEMS';

const isLogged = localStorage.getItem('token') ? true : false

export function addItem(newProduct, userId) {
  newProduct.localCounter = 1;
  return function (dispatch) {
    if (isLogged) {
      axios.post(`/orders/users/${userId}/cart`, {id: newProduct.id}).then((res) =>
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
          dispatch({
            type: INCREMENT_COUNTER,
          })
        }
      }
      else{
        let newCart = JSON.stringify([newProduct])
        localStorage.setItem('cart', newCart);
        dispatch({
          type: INCREMENT_COUNTER,
        })
      }
    }
    
  };
}

export function removeItem(deleteProduct, userId){
  return function(dispatch){
    if(isLogged){
      axios
        .delete(`/users/${userId}/cart`, { id: deleteProduct.id })
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

export const increaseProduct = (item, userId) => (dispatch) => {
   if (isLogged) {
     axios
       .put(`/users/${userId}/cart`, {
         id: item.id,
         quantity: item.quantity + 1,
       })
       .then((res) =>
         dispatch({
           type: INCREMENT_QUANTITY,
           payload: item.id
         })
       );     
   } else {
     let actualCart = JSON.parse(localStorage.getItem('cart'));
     let newCart = actualCart.filter((i) => i.id !== item.id);
     item.localCounter = item.localCounter + 1;
     localStorage.setItem('cart', JSON.stringify(newCart.concat(item)));
   }
}

export const decreaseProduct = (item, userId) => (dispatch) => {
    if (isLogged) {
      axios
        .put(`/users/${userId}/cart`, {
          id: item.id,
          quantity: item.quantity - 1,
        })
        .then((res) =>
          dispatch({
            type: DECREMENT_QUANTITY,
            payload: item.id,
          })
        );
    } else {
      let actualCart = JSON.parse(localStorage.getItem('cart'));
      let newCart = actualCart.filter((i) => i.id !== item.id);
      if (item.localCounter > 1) {
        item.localCounter = item.localCounter - 1;
      } else {
        return localStorage.setItem('cart', JSON.stringify(newCart));
      }
      localStorage.setItem('cart', JSON.stringify(newCart.concat(item)));
    }
}