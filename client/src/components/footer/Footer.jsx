import React from 'react'
import ReactWhatsapp from 'react-whatsapp';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { positions } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
    footer: {
      marginTop: theme.spacing(3),
      bottom: 0,
    }
}))


const Footer = () => {
  const classes = useStyles();
    return (
      <>
      <Box  width={1} flexDirection="column">
            {/* Column1 */}
            <div>
              <h5>
                <li>555-555-5555</li>
                <li>email@email.com</li>
                <li>Calle Falsa 123</li>
              </h5>
            </div>
          <hr />
          {/* <ReactWhatsapp
            number="1-212-736-5000"
            message="Chatea con nosotros!!!"
          >
            <WhatsAppIcon />
            Chatea con nosotros
          </ReactWhatsapp> */}
      </Box>
      <Box display="flex" justifyContent="center">
              &copy;{new Date().getFullYear()} ECOMMERCE | Todos los derechos
              reservados | Teminos de servicios | Politica de privacidad
      </Box>
    </>
    );
}

export default Footer