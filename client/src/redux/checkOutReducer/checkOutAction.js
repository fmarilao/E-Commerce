import axios from 'axios';

export const SET_FORM = 'SET_FORM';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const CLEAN_CHECKOUT = 'CLEAN_CHECKOUT'

export const setForm = (name, value) => {
    return {type: SET_FORM, payload: {name, value}}
}

const indexProducts = (products) => {
    return products.reduce((acc, el) => ({
        ...acc,
        [el.id]: {name:  el.name, description: el.description}
      }), {})
}

const indexOrderLines = (orders) => {
    return orders.reduce((acc, el) => ({
        ...acc,
        [el.productId]: {price:  el.price, quantity: el.quantity}
      }), {})
}

const mergeOrderProducts = (order,product) => {
    const products = indexProducts(product)
    const orders = indexOrderLines(order)
    let mergeObjects = []
    for(let key in products){
        mergeObjects.push({...products[key], ...orders[key], id: key})
    }
    return mergeObjects
}







export const setProducts = (userId) => (dispatch) => {
    let cartProducts = []
    let orderLines = []
    axios.get(`/orders/users/${userId}/cart`)
    .then(res => res.data)
    .then(res => {
        orderLines = res
        const allProducts = res.map(item => {
            return new Promise((resolve, reject) => {
              resolve(
                axios.get(`/products/${item.productId}`)
                .then(res => {
                  cartProducts.push(res.data)})
                )
            })
          })
        return allProducts
    })
    .then(res => {
        Promise.all(res)
        .then(res => {
            dispatch({type: SET_PRODUCTS, payload: mergeOrderProducts(orderLines,cartProducts)}) 
        })
    })
}

export const cleanCheckout = () => {
    return {type: CLEAN_CHECKOUT}
}