import React, { useState, useEffect } from 'react'
import CartDetail from './CartDetail'
import { useSelector } from 'react-redux';

const Cart = () => {
    let [cart, setCart] = useState([])
    const reduxCart = useSelector((state) => state.cartReducer.cart);

    useEffect(() => {
        let localCart = JSON.parse(localStorage.getItem('cart'))
        if(reduxCart.length){
            setCart(reduxCart)
        }
        else{
            localCart && setCart(localCart)
        }
    }, [reduxCart])

    return (
        <div>
                <div>
                    <h1>Cart Component</h1>
                </div>
                <div>
                    <h2> 
                        Lista de productos
                    </h2>
                        {cart && cart.map((element, i) => {
                        return (<CartDetail product={element} key={i}/>)
                        })}
                </div>
                <div>
                    <h2>
                        Resumen de la compra
                    </h2>
                </div>
                <div>
                    <button>Checkout</button>
                    <button>Cancelar</button>
                </div>
        </div>
    )
}

export default Cart;