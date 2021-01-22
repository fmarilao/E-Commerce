import React from 'react'
import { Route } from 'react-router-dom';
import Dashboard from '../components/admin/dashboard/main/dashboard.jsx'



const routes = () => {
    return(
        <>  
            <Route path="/dashboard" component={Dashboard} />
        </>
    )
    
}




export default routes;