import { combineReducers } from 'redux'
import productReducer from './searchBarReducer/reducerProduct';
/* import loginReducer from './LoginReducer/reducer'
import storeReducer from './storeReducer/reducer'*/
import cartReducer from './cartReducer/reducer' ;
import loginReducer from './loginReducer/reducerLogin'


const rootReducer = combineReducers(
    {
        productReducer,
        cartReducer,
        loginReducer
/*         storeReducer,
        cartReducer,
        loginReducer, */
    }
)

export default rootReducer;