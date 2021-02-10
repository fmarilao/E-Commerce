import {GET_OUTSTANDING} from "./actionOutstanding"

const initialState = {
  outstanding: []
};

const reducerOutstanding = (state = initialState, action) => {
  if (action.type === GET_OUTSTANDING) {
    console.log(action)
    return {
      ...state,
      outstanding: action.payload.data,
    };
  }
  return state;
};

export default reducerOutstanding;