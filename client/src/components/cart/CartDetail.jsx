import React from 'react'
import { useDispatch } from 'react-redux';
import { removeItem } from '../../redux/cartReducer/action.js'


const CartDetail = (props) => {
    const dispatch = useDispatch();
    const {product} = props
    
    return (
        <>
            <div>
            {product.image}
            {product.id}
            {product.name}
            {product.description}
            {product.price}
            {product.quantity}
            </div>
            <button onClick={() => dispatch(removeItem(product))}> remove</button>
        </>
    )
}

export default CartDetail
