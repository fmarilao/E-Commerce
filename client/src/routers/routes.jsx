import React from 'react';
import { Route } from 'react-router-dom';
import SearchBar from '../components/searchbar/SearchBar';
import Catalog from '../components/catalog/Catalog'

const routes = () => {
  return (
    (<Route path="/" component={SearchBar} />),
    (<Route path="/catalog" component={Catalog} />)
  );
};

export default routes;
