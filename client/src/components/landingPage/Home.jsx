import React, { useEffect } from "react";
import Carrousel from '../carousel/Carousel.jsx';
import Navbar from '../navbar/Navbar';
import Featured from './Featured'
// import swal from 'sweetalert2'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { initializateApp } from '../../services/initializateApp'
import { SET_STATE } from '../../redux/cartReducer/action'

function Home() {
  const userId = localStorage.getItem('userId')
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if(window.location.href.includes('&status=approved')){
      axios.put(`/orders/${userId}`, {state: 'completed' })
      .then(() => {alert("Your order was successfully completed")})
      .then(() => initializateApp(userId, dispatch))
      .then(() => dispatch({type: SET_STATE, payload: 'cart'}))
      .then(() => history.push('/'))
    }
    // eslint-disable-next-line
  }, [])

    // swal("Your order was successfully completed", {
    //   buttons: [true, "Ok"],
    //   });

  return (
    <React.Fragment>
      <Navbar/>
      <Carrousel></Carrousel>
      <Featured />
    </React.Fragment>
  );
}
export default Home