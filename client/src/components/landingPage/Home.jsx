import React, { useEffect } from "react";
import Carrousel from '../carousel/Carousel.jsx';
import Navbar from '../navbar/Navbar';
// import swal from 'sweetalert2'
import axios from 'axios';
import { useHistory } from 'react-router-dom';


function Home() {
  const userId = localStorage.getItem('userId')
  const history = useHistory();

  useEffect(() => {
    if(window.location.href.includes('&status=approved')){
      axios.put(`/orders/${userId}`, {state: 'completed' })
      .then(() => {alert("Your order was successfully completed")})
      .then(() => history.push('/'))
    }
    }, [])

    // swal("Your order was successfully completed", {
    //   buttons: [true, "Ok"],
    //   });

  return (
    <React.Fragment>
      <Navbar/>
      <Carrousel></Carrousel>
    </React.Fragment>
  );
}
export default Home