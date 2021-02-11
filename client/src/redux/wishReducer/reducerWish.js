import {POST_WISH, GET_WISHES} from './actionsWish'

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
        default: return state
    }
}
export default reducerWishList