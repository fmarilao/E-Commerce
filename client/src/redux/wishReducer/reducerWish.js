import {POST_WISH, GET_WISHES, DELETE_WISH} from './actionsWish'

const initialState = {
    wishes: [],
    counter: 0
}

const reducerWishList = (state = initialState, action) => {
    switch (action.type) {
        case POST_WISH:{     
            if(!action.payload.data.message){
                return {
                    ...state,
                    wishes: state.wishes.concat(action.payload.data),
                    counter: state.counter + 1
                }
            }else{
                return{
                    ...state,
                    wishes: state.wishes,
                    counter: state.counter,
                }
            }
        }
        case GET_WISHES:{
            console.log(action.payload.data.length)
            return {
                ...state,
                wishes: action.payload.data,
                counter: action.payload.data.length,
                //! hacemos un counter le chequeamos el length y asi no perdemos el estado
              
            }
        }
        case DELETE_WISH:{
            let newWishList = state.wishes.filter(wish => wish.id !== action.payload.id )
            if(state.counter >= 1){
                return {
                    ...state,
                    wishes: newWishList,
                    counter: state.counter -1
                }
            }else{
                return {
                    ...state,
                    wishes: newWishList,
                    counter: state.counter
                }
            }
        }
        default: return state
    }
}
export default reducerWishList