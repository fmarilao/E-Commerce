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
export const CLEAN_CART = 'CLEAN_CART';

const isLogged = localStorage.getItem('token') ? true : false;
const userId = localStorage.getItem('userId');


export function addItem(newProduct) {
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

export function removeItem(deleteProduct){
  return function(dispatch){
    if(isLogged){
      axios
        .delete(`/orders/users/${userId}/cart/${deleteProduct.id}`)
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
   if (false) {
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
     let currentCart = JSON.parse(localStorage.getItem('cart'));
     let index = null;
     let newProd = {}
     for(let [i, prod] of currentCart.entries()){
       if(prod.id === item.id){
        index = i
        newProd = prod
       }
     }
     newProd.localCounter ? newProd.localCounter++ : newProd.localCounter = 1;
     currentCart[index] = newProd
     localStorage.setItem('cart', JSON.stringify(currentCart));
   }
}

export const decreaseProduct = (item, userId) => (dispatch) => {
    if (false) {
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
     let currentCart = JSON.parse(localStorage.getItem('cart'));
     let index = null;
     let newProd = {}
     for(let [i, prod] of currentCart.entries()){
       if(prod.id === item.id){
        index = i
        newProd = prod
       }
     }
     newProd.localCounter && newProd.localCounter > 1 && newProd.localCounter--;
     currentCart[index] = newProd
     localStorage.setItem('cart', JSON.stringify(currentCart));
    }
}

export const cleanCart = () => (dispatch) => {
  dispatch({type: CLEAN_CART})
}