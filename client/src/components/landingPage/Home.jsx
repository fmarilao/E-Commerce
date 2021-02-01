import React from "react";
import Carrousel from '../carousel/Carousel.jsx';
import Navbar from '../navbar/Navbar';

function Home() {

  return (
    <React.Fragment>
      <Navbar/>
      <Carrousel></Carrousel>
    </React.Fragment>
  );
}
export default Home