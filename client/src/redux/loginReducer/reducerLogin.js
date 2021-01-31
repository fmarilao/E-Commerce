import {SET_USER} from './actionLogin.js'


const initialState = {
    user: {}
  }

  export default (state = initialState, action) => {
    if (action.type === SET_USER) {
          return {
              ...state,
              user: {
                  email: action.payload.email,
                  id: action.payload.id,
                  role: action.payload.role,
                }
          };
      }
    return state;
  }