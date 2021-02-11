import axios from "axios"
export const POST_WISH = 'POST_WISH'
export const GET_WISHES = 'GET_WISHES'
export const DELETE_WISH = 'DELETE_WISH'

export const postWish = (data) => 
(dispatch) => {
    axios
        .post(`/wishlist/${data.userId}/wish`, {
            id: data.productId,
        }).then((wish) => {
            dispatch({
                type: POST_WISH,
                payload: wish
            })
        }).catch((err)=> console.log(err))
}

export const getWishes = (userId) => (dispatch) => {
    if(userId){
        axios
        .get(`/wishlist/${userId}`)
        .then((wishes)=>{
            dispatch({
                type: GET_WISHES,
                payload: wishes,
            })
        }).catch((err) => console.log(err))
    }
}

export const deleteWish = (wishId) => (dispatch) => {
    console.log('wish id action', wishId)
    axios
        .delete(`/wishlist/${wishId}`)
        .then((wish)=>{
            dispatch({
                type: DELETE_WISH,
                payload: wish,
            })
        }).catch((err) => console.log(err))
}