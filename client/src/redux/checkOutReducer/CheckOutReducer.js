import { SET_FORM, SET_PRODUCTS, CLEAN_CHECKOUT } from './checkOutAction'

const initialState = {
  paymentForm: {
    firstName: "",
    lastName: "",
    address: "",
    zip: "",
    city: "",
    state: "",
    comments: "",
  },
  products:[]
};

export default (state = initialState, action) => {
  switch(action.type){
    case SET_FORM:{
      return {
        ...state,
        paymentForm: {
          ...state.paymentForm,
          [action.payload.name]: action.payload.value
        }
      }
    }
    case SET_PRODUCTS:{
      return{
        ...state,
        products: action.payload
      }
    }
    case CLEAN_CHECKOUT: {
      return {
        ...state,
        paymentForm: {
          firstName: "",
          lastName: "",
          address: "",
          zip: "",
          city: "",
          state: "",
          comments: "",
        },
        products:[]
      }
    }
    default: return state
  }
}