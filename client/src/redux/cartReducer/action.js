import axios from "axios";

export const ADD_PRODUCT_CART = 'ADD_PRODUCT_CART';
export const REMOVE_PRODUCT_CART = 'REMOVE_PRODUCT_CART';
export const UPDATE_PRODUCT_CART = 'UPDATE_PRODUCT_CART';
export const INCREASE_PRODUCT = 'INCREASE_PRODUCT';
export const DECREASE_PRODUCT = 'DECREASE_PRODUCT';

const isLogged = false;
// const userId = JSON.parse(localStorage.getItem("UserId"));

export function addItem(newProduct, userId) {
  newProduct.localCounter = 1
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
          console.log('new product', newProduct)
          let newCart = JSON.stringify(cart.concat(newProduct))
          localStorage.setItem('cart', newCart);
        }
      }
      else{
        console.log(newProduct)
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

export const increaseProduct = (item) => (dispatch, getState) => {
   if(isLogged){
      // axios.get(`/orders/active/${userId}`).then(res => res.data.id)
      // .then(res => {
      //   axios.delete(`/orders/${res}/deleteProduct/`, deleteProduct)
      // })
      // .then((res) =>
      //   dispatch({
      //     type: REMOVE_PRODUCT_CART,
      //     payload: deleteProduct,
      //   })
      // );   
    }
    else{
      let actualCart = JSON.parse(localStorage.getItem("cart"))
      let newCart = actualCart.filter((i) => i.id !== item.id)
      item.localCounter = item.localCounter +1
      localStorage.setItem('cart', JSON.stringify(newCart.concat(item))) 
    }}

    export const decreaseProduct = (item) => (dispatch, getState) => {
      if(isLogged){
         // axios.get(`/orders/active/${userId}`).then(res => res.data.id)
         // .then(res => {
         //   axios.delete(`/orders/${res}/deleteProduct/`, deleteProduct)
         // })
         // .then((res) =>
         //   dispatch({
         //     type: REMOVE_PRODUCT_CART,
         //     payload: deleteProduct,
         //   })
         // );   
       }
       else{
         let actualCart = JSON.parse(localStorage.getItem("cart"))
         let newCart = actualCart.filter((i) => i.id !== item.id)
         if (item.localCounter > 1) {
           item.localCounter = item.localCounter -1
         }else{
          return localStorage.setItem('cart', JSON.stringify(newCart))
         }
         localStorage.setItem('cart', JSON.stringify(newCart.concat(item))) 
       }}

//   newCart.forEach((product) => {
//     product.id === id && product.quantityInCart++;
//   });

//   dispatch({
//     type: INCREASE_PRODUCT,
//     newCart,
//   });
//   localStorage.setItem('Cart', JSON.stringify(newCart));
// };

// export const decreaseProduct = (id) => (dispatch, getState) => {
//   const newCart = getState().cartReducer.productsInCart.slice();

//   newCart.forEach((product) => {
//     product.id === id && product.quantityInCart--;
//   });

//   dispatch({
//     type: DECREASE_PRODUCT,
//     newCart,
//   });
//   localStorage.setItem('Cart', JSON.stringify(newCart));
// };

// const updateItem = (itemID, amount) => {
//   let cartCopy = [...cart];
//   //Busco si el item que me pasan esta en el cart
//   let existingItem = cartCopy.find((item) => item.ID === itemID);
//   //Si no existe salgo de la fn
//   if (!existingItem) return;
//   //Si existe
//   existingItem.quantity += amount;
//   //Valido el resultado
//   if (existingItem.quantity <= 0) {
//     //remuevo el articulo para que no quede negativo
//     cartCopy = cartCopy.filter((item) => item.ID !== itemID);
//   }
//   setCart(cartCopy);

//   let cartString = JSON.stringify(cartCopy);
//   localStorage.setItem('cart', cartString);
// }; 

// else{
//           let actualCart = JSON.parse(localStorage.getItem("cart"))
//           actualCart.stock = actualCart.stock -1
//           actualCart.quantity = actualCart.quantity + 1
//           let newCart = JSON.stringify(cart.concat(newProduct))
          // localStorage.setItem('cart', newCart);