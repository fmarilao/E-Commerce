import React from 'react';
import { Route } from 'react-router-dom';
import SearchBar from '../components/searchbar/SearchBar';

const routes = () => {
  return <Route path="/" component={SearchBar} />;
};

export default routes;
