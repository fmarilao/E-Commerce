import { combineReducers } from 'redux'
import productReducer from './searchBarReducer/reducerProduct';
/* import loginReducer from './LoginReducer/reducer'
import storeReducer from './storeReducer/reducer'
import cartReducer from './CartReducer/reducer' */
//import counter from './storeReducer/counter'

const rootReducer = combineReducers(
    {
        productReducer
/*         storeReducer,
        cartReducer,
        loginReducer, */
    }
)

export default rootReducer;