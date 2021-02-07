import React from "react";
import Carrousel from '../carousel/Carousel.jsx';
import Navbar from '../navbar/Navbar';
import Featured from './Featured'

function Home() {

  return (
    <React.Fragment>
      <Navbar/>
      <Carrousel></Carrousel>
      <Featured />
    </React.Fragment>
  );
}
export default Home