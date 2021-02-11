import {POST_WISH, GET_WISHES, DELETE_WISH} from './actionsWish'

const initialState = {
    wishes: []
}

const reducerWishList = (state = initialState, action) => {
    switch (action.type) {
        case POST_WISH:{
            return {
                ...state,
                wishes: state.wishes.concat(action.payload)
                }
        }
        case GET_WISHES:{
            return {
                ...state,
                wishes: action.payload.data
            }
        }
        case DELETE_WISH:{
            let newWishList = state.wishes.filter(wish => wish.id !== action.payload.id )
            return {
                ...state,
                wishes: newWishList
            }
        }
        default: return state
    }
}
export default reducerWishList