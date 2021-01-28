import { combineReducers } from 'redux'
import productReducer from './searchBarReducer/reducerProduct';
/* import loginReducer from './LoginReducer/reducer'
import storeReducer from './storeReducer/reducer'*/
import cartReducer from './cartReducer/reducer' 


const rootReducer = combineReducers(
    {
        productReducer,
        cartReducer
/*         storeReducer,
        cartReducer,
        loginReducer, */
    }
)

export default rootReducer;