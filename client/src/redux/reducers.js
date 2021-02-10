import { combineReducers } from 'redux';
import productReducer from './searchBarReducer/reducerProduct';
import cartReducer from './cartReducer/reducer' ;
import loginReducer from './loginReducer/reducerLogin';
import reviewsReducer from './reviewsReducer/reducerReviews';
import checkoutReducer from './checkOutReducer/CheckOutReducer'
import ordersReducer from './ordersReducer/reducerOrders'

const rootReducer = combineReducers(
    {
        productReducer,
        cartReducer,
        loginReducer,
        reviewsReducer,
        checkoutReducer,
        ordersReducer
    }
)

export default rootReducer;