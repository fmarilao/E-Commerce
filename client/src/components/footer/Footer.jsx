import React from 'react'
import ReactWhatsapp from 'react-whatsapp';

const Footer = () => {
    return (
    <div>
      <div>
        <div>
          {/* Column1 */}
          <div>
            <h2>ECOMMERCE</h2>
            <h5>
              <li>555-555-5555</li>
              <li>email@email.com</li>
              <li>Calle Falsa 123</li>
            </h5>
          </div>
         </div>
        <hr />
      <ReactWhatsapp number="1-212-736-5000" message="Chatea con nosotros!!!" />
        <div>
          <p>
            &copy;{new Date().getFullYear()} ECOMMERCE | Todos los derechos reservados | Teminos de servicios | Politica de privacidad
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer