import React from "react";
import { Route } from "react-router-dom";
import Dashboard from "../components/admin/dashboard/main/dashboard.jsx";
import Cart from "../components/cart/Cart";
import Catalog from "../components/catalog/Catalog";
import Home from "../components/landingPage/Home";
import Login from "../components/login/Login";
import NavBar from "../components/navbar/Navbar";
import ProductDetail from "../components/productDetail/ProductDetail";
import RegisterForm from "../components/register/RegisterForm";
import Checkout from "../components/checkout/Checkout";

const routes = () => {
  return (
    <>
      {/* <Route path="/" component={NavBar} /> */}
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/product" component={NavBar} />
      <Route path="/product/:id" component={ProductDetail} />
      <Route path="/register" component={NavBar} />
      <Route path="/register" component={RegisterForm} />
      <Route exact path="/" component={Home} />
      <Route path="/products" component={NavBar} />
      <Route exact path="/products" component={Catalog} />
      <Route exact path="/products/category/:idCat" component={Catalog} />
      <Route exact path="/products/search/:name" component={Catalog} />
      <Route path="/cart" component={NavBar} />
      <Route path="/cart" component={Cart} />
      {/* <Route path="/" component={Footer} /> */}
      <Route path="/login" component={NavBar} />
      <Route path="/login" component={Login} />
      <Route path="/checkout" component={Checkout} />
    </>
  );
};

export default routes;
