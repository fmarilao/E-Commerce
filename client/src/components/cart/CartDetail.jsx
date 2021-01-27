import React from 'react'


const CartDetail = (props) => {
    
    const {product} = props
    
    return (
    <div>
    Imagen: {product.image}
    id: {product.id}
    Nombre: {product.name}
    Descripcion: {product.description}
    Precio: {product.price}
    Cantidad: {product.quantity}
    </div>
    )
}

export default CartDetail
