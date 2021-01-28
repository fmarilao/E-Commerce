import axios from "axios";

// import axios from 'axios';
export const ADD_PRODUCT_CART = 'ADD_PRODUCT_CART';
export const REMOVE_PRODUCT_CART = 'REMOVE_PRODUCT_CART';
export const UPDATE_PRODUCT_CART = 'UPDATE_PRODUCT_CART';
const isLogged = false;
// const userId = JSON.parse(localStorage.getItem("UserId"));

export function addItem(newProduct, userId) {
  return function (dispatch) {
    if (isLogged) {
      axios.post(`/order/addproduct/${userId}`, newProduct).then((res) =>
        dispatch({
          type: ADD_PRODUCT_CART,
          payload: newProduct,
        })
      );
    }
    else{
      let cart  = JSON.parse(localStorage.getItem("cart"))
      if(cart){
        if(!cart.find(item => item.id === newProduct.id)){
          let newCart = JSON.stringify(cart.concat(newProduct))
          localStorage.setItem('cart', newCart);
        }
      }
      else{
        let newCart = JSON.stringify([newProduct])
        localStorage.setItem('cart', newCart);
      }
    }
  };
}


export function removeItem(deleteProduct, userId){
  return function(dispatch){
    if(isLogged){
      axios.get(`/orders/active/${userId}`).then(res => res.data.id)
      .then(res => {
        axios.delete(`/orders/${res}/deleteProduct/`, deleteProduct)
      })
      .then((res) =>
        dispatch({
          type: REMOVE_PRODUCT_CART,
          payload: deleteProduct,
        })
      );
     
    }
    else{
      let cart = JSON.parse(localStorage.getItem("cart"))
      cart = JSON.stringify(cart.filter((e) => e.id !== deleteProduct.id));
      localStorage.setItem('cart', cart);
    }
  }
}

/* export function incrementItem(userId, product){
  return function(dispatch){
    let cartCopy = JSON.parse(localStorage.getItem("cart"))
    let existingItem = cartCopy.find((item) => item.id === product.id);
  }
}

const updateItem = (itemID, amount) => {
  let cartCopy = [...cart];
  //Busco si el item que me pasan esta en el cart
  let existingItem = cartCopy.find((item) => item.ID === itemID);
  //Si no existe salgo de la fn
  if (!existingItem) return;
  //Si existe
  existingItem.quantity += amount;
  //Valido el resultado
  if (existingItem.quantity <= 0) {
    //remuevo el articulo para que no quede negativo
    cartCopy = cartCopy.filter((item) => item.ID !== itemID);
  }
  setCart(cartCopy);

  let cartString = JSON.stringify(cartCopy);
  localStorage.setItem('cart', cartString);
}; */

