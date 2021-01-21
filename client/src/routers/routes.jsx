import React from 'react'
import { Route } from 'react-router-dom'
import Catalog from '../components/catalog/Catalog'

const routes = () => {
    return (
    <Route path="/catalog" component={Catalog}/>
    )
}
export default routes;