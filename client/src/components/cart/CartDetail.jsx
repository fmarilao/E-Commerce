import React from 'react'
import { useDispatch } from 'react-redux';
import { removeItem, increaseProduct } from '../../redux/cartReducer/action.js';


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
        
        <button onClick={() => dispatch(removeItem(product))}>// - // </button>
        <button onClick={() => dispatch(increaseProduct(product))}>+</button>
        <button onClick={() => dispatch(removeItem(product))}> remover</button>
      </>
    );
}

export default CartDetail
