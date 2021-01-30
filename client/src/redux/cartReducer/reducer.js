import {
  ADD_PRODUCT_CART,
  REMOVE_PRODUCT_CART,
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
} from './action.js';


const initialState = {
    cart: [],
    counter: JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")).length : 0
  }
  
  export default (state = initialState, action) => {
    if (action.type === ADD_PRODUCT_CART) {
          return {
              ...state,
              cart: state.cart.concat(action.payload)
          };
      }
    if(action.type === REMOVE_PRODUCT_CART){
        return {
            ...state,
            cart: state.cart.filter(product => product.id !== action.payload.id)
        }
    }
    if (action.type === INCREMENT_QUANTITY){

      let actualCart = state.cart
      let newCart = actualCart.filter((i) => i.id !== action.payload);
      let item = actualCart.filter((i) => i.id === action.payload);
      item.quantity = item.quantity + 1 
      newCart.concat(item);
      return {
        ...state,
        cart: newCart
      }
    }
    if(action.type === DECREMENT_QUANTITY){

      let actualCart = state.cart;
      let newCart = actualCart.filter((i) => i.id !== action.payload);
      let item = actualCart.filter((i) => i.id === action.payload);
      item.quantity = item.quantity - 1;
      newCart.concat(item);
      return {
        ...state,
        cart: newCart
      };
    }
    if (action.type === INCREMENT_COUNTER) {
      return {
          ...state,
          counter: (state.counter += 1),
        };
      }
    if(action.type === DECREMENT_COUNTER){
      return {
        ...state,
        counter: state.counter -= 1
      }
    }

    return state;
  }