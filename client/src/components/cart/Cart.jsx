import React, { useState, useEffect } from 'react'

const Cart = () => {


    let productItems = [{
        image: 'URLimage',
        nombre: 'zapatilla',
        descripcion: 'zapatillas nike',
        precio: 50,
        cantidad: '1',
    },
    {
        image: 'URLimage',
        nombre: 'zapatilla',
        descripcion: 'zapatillas adidas',
        precio: 50,
        cantidad: '1',
    }]

    localStorage.setItem("producto", JSON.stringify(productItems) )



    //Funciones de Agregar al carrito, editar y borrar
    let [cart, setCart] = useState([])
    let localCart = localStorage.getItem('cart')

    const addItem = (item) => {
        //Agregar cuando el item no esta en el carrito
        let cartCopy = [...cart]
        let {ID} = item //falta ver si el item trae un ID
        //Busco el item en el array cart
        let existingItem = cartCopy.find(cartItem => cartItem.ID == ID)

        //Agregar cuando el item ya existe
        if (existingItem){
            existingItem.quantity += item.quantity
        }else{ //Si el item no esta, agregarlo
            cartCopy.push(item)
        }
        //Actualizo el estado del cart
        setCart(cartCopy)

        //Guardo en el localStorage
        let stringCart = JSON.stringify(cartCopy)
        localStorage.setItem("cart", stringCart)
    }

    const updateItem = (itemID, amount) => {
        let cartCopy = [...cart]
        //Busco si el item que me pasan esta en el cart
        let existingItem = cartCopy.find(item => item.ID == itemID)
        //Si no existe salgo de la fn
        if (!existingItem) return
        //Si existe
        existingItem.quantity += amount
        //Valido el resultado
        if (existingItem.quantity <=0) {
            //remuevo el articulo para que no quede negativo
            cartCopy = cartCopy.filter(item => item.ID != itemID)
        }
        setCart(cartCopy)

        let cartString = JSON.stringify(cartCopy)
        localStorage.setItem('cart', cartString)
    }

    const removeItem = (itemID) => {
        let cartCopy = [...cart]
        cartCopy = cartCopy.filter(item => item.ID != itemID)

        setCart(cartCopy)

        let cartString = JSON.stringify(cartCopy)
        localStorage.setItem('cart', cartString)
    }

    const obtenerProductos = () => {
        let productItems = localStorage.getItem("producto")
        // console.log(localStorage.getItem("productos"));
        return productItems

    }
  
    useEffect(() => {
        localCart = JSON.parse(localCart)
        if (localCart) setCart(localCart)
    }, [])

    let productosEnLocal = obtenerProductos() 

    return (
        <div>
                <div>
                    <h1>Cart Component</h1>
                </div>
                <div>
                    <h2> 
                        Lista de productos
                    </h2>
                    {productosEnLocal}
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