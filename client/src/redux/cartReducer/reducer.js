import {ADD_PRODUCT_CART} from './action.js'
import {REMOVE_PRODUCT_CART} from './action.js'
import {INCREASE_PRODUCT} from "./action.js"



const initialState = {
    cart: []
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
    if (action.type === INCREASE_PRODUCT) {
      return {
        ...state,
      }
    }
    return state;
  }