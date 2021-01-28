import axios from "axios";

// import axios from 'axios';
export const ADD_PRODUCT_CART = 'ADD_PRODUCT_CART';
export const REMOVE_PRODUCT_CART = 'REMOVE_PRODUCT_CART';
export const UPDATE_PRODUCT_CART = 'UPDATE_PRODUCT_CART';

// const userActive = JSON.parse(localStorage.getItem("User"));

export function addItem(userId, newProduct) {
  return function (dispatch) {
    let stringCart = JSON.stringify(newProduct);
    localStorage.setItem('cart', stringCart);

    if (isLogged) {
      axios.post(`/order/addproduct/${userId}`, newProduct).then((res) =>
        dispatch({
          type: ADD_PRODUCT_CART,
          payload: newProduct,
        })
      );
    } else {
      dispatch({
        type: ADD_PRODUCT_CART,
        payload: newProduct,
      });
    }
  };
}


export function removeItem(userId, deleteProduct){
  return function(dispatch){

    let cart = JSON.parse(localStorage.getItem("cart"))
    cart = JSON.stringify(cart.filter((e) => e.id !== deleteProduct.id));
    localStorage.setItem('cart', cart);

    if(isLogged){
      axios.delete(`/orders/${orderId}/deleteProduct/`, deleteProduct).then((res) =>
        dispatch({
          type: REMOVE_PRODUCT_CART,
          payload: deleteProduct,
        })
      );
    } else {
      dispatch({
        type: REMOVE_PRODUCT_CART,
        payload: deleteProduct,
      });
    }
  }
}

const removeItem = (itemID) => {
  let cartCopy = [...cart];
  cartCopy = cartCopy.filter((item) => item.ID !== itemID);

  setCart(cartCopy);

  let cartString = JSON.stringify(cartCopy);
  localStorage.setItem('cart', cartString);
};

const addItem = (item) => {
  //Agregar cuando el item no esta en el carrito
  let cartCopy = [...cart];
  let { ID } = item; //falta ver si el item trae un ID
  //Busco el item en el array cart
  let existingItem = cartCopy.find((cartItem) => cartItem.ID === ID);

  //Agregar cuando el item ya existe
  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    //Si el item no esta, agregarlo
    cartCopy.push(item);
  }
  //Actualizo el estado del cart
  setCart(cartCopy);

  //Guardo en el localStorage
  let stringCart = JSON.stringify(cartCopy);
  localStorage.setItem('cart', stringCart);
};

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
};

