import React, { useState, useEffect } from 'react'
import CartDetail from './CartDetail'

const Cart = () => {
    
    let productItems = [{
        id: 1,
        image: 'URLimage',
        name: 'zapatilla',
        description: 'zapatillas nike',
        price: 6000,
        quantity: '2',
        shippingCost: 'FREE'
    },
    {
        id: 2,
        image: 'URLimage',
        name: 'zapatilla',
        description: 'zapatillas adidas',
        price: 5000,
        quantity: '2',
        shippingCost: '50',
    }]
    
    localStorage.setItem("cartItems", JSON.stringify(productItems))
    
    //Funciones de Agregar al carrito, editar y borrar
    let [cart, setCart] = useState([])
    let localCart = localStorage.getItem('cartItems')
    
    
    

    useEffect(() => {
        localCart = JSON.parse(localCart)
        console.log(localCart)
        if (localCart) setCart(localCart)
    }, [])
    
    
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