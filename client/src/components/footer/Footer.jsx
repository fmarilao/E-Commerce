import React from 'react'
import ReactWhatsapp from 'react-whatsapp';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    footer: {
      marginTop: theme.spacing(3),
      bottom: 0
    }
}))


const Footer = () => {
  const classes = useStyles();
    return (
      <Grid container className={classes.footer}
       direction="column"
              alignItems="center"
              justify="center"
      >
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

          {/* <ReactWhatsapp
            number="1-212-736-5000"
            message="Chatea con nosotros!!!"
          >
            <WhatsAppIcon />
            Chatea con nosotros
          </ReactWhatsapp> */}
          <div>
            <p>
              &copy;{new Date().getFullYear()} ECOMMERCE | Todos los derechos
              reservados | Teminos de servicios | Politica de privacidad
            </p>
          </div>
        </div>
      </div>
      </Grid>
    );
}

export default Footer