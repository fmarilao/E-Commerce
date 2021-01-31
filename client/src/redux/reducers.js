import { combineReducers } from 'redux'
import productReducer from './searchBarReducer/reducerProduct';
import cartReducer from './cartReducer/reducer' ;
import loginReducer from './loginReducer/reducerLogin'


const rootReducer = combineReducers(
    {
        productReducer,
        cartReducer,
        loginReducer
    }
)

export default rootReducer;