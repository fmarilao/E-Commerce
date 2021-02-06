import { combineReducers } from 'redux'
import productReducer from './searchBarReducer/reducerProduct';
import cartReducer from './cartReducer/reducer' ;
import loginReducer from './loginReducer/reducerLogin';
import checkoutReducer from './checkOutReducer/CheckOutReducer'


const rootReducer = combineReducers(
    {
        productReducer,
        cartReducer,
        loginReducer,
        checkoutReducer
    }
)

export default rootReducer;