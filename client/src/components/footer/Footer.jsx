import React, {useEffect, useState} from 'react'
import ReactWhatsapp from 'react-whatsapp';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter'
import { Box, Divider, Grid,  Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Link} from "react-router-dom";
import './Footer.css'




const useStyles = makeStyles((theme) => ({
    mainFooter: {
      backgroundColor: '#ff9800',
      padding:"2rem",
      marginTop:'calc(5% + 0px)',
      flexGrow: 1,
    },
    wsp: {
      backgroundColor: 'rgba(52, 52, 52, 0)',
      border: "none"
    },
    icons: {
      fontSize:"26px"
    },
    text: {
      color:"inherit"
    }
}))

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <a color="inherit" href="http://localhost:3000/">
        Magios Shop
      </a>{" "}
      | All rights reserved | Terms of services | Politics of Privacy{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Footer = () => {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get("/categories").then((res) => setCategories(res.data));
  }, []);

  return (
    <Grid className={classes.mainFooter}>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="flex-end"
      >
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="flex-start"
        >
          {/* column */}
          <Grid item>
            <Typography variant="h6">Magios Shop</Typography>
            <ul className="list">
              <Typography>About</Typography>
              <Typography className= {classes.text} component={Link} to={`/products`}>
                {" "}
                Catalogue{" "}
              </Typography>
              <Typography>Payment terms</Typography>
              <Typography>Terminos de pago</Typography>
            </ul>
          </Grid>
          {/* column */}
          <Grid item>
            <Typography variant="h6">Ayuda</Typography>
            <ul className="list">
              <Typography>FAQ</Typography>
              <Typography>Contact</Typography>
              <Typography>Como llegar</Typography>

            </ul>
          </Grid>
          {/* column */}
          <Grid>
            <Typography variant="h6">Links</Typography>
            <ul className="list">
              {categories &&
                categories.map((element, index) => {
                  return (
                    <ul className="list" key={index}>
                      <Typography
                        className= {classes.text}
                        component={Link}
                        to={`/products/category/${element.id}`}
                      >
                        {element.name}
                      </Typography>
                    </ul>
                  );
                })}
            </ul>
          </Grid>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          <ReactWhatsapp className={classes.wsp}
            number="1-212-736-5000"
            message="Chatea con nosotros!!!"
          >
            <WhatsAppIcon />
          </ReactWhatsapp>
          <a href="https://www.facebook.com/Magios-Shop" target="_blank" rel="noopener noreferrer" className="click">
            <FacebookIcon className={classes.icons} />
          </a>

          <a href="https://twitter.com/Magios-Shop" target="_blank" rel="noopener noreferrer" className="click">
            <TwitterIcon className={classes.icons} />
          </a>
          <a href="https://www.instagram.com/Magios-Shop" target="_blank" rel="noopener noreferrer" className="click">
            <InstagramIcon className={classes.icons} />
          </a>
        </Grid>
        <Box display="flex" justifyContent="center">
          <Divider variant="middle" />
          <Copyright />
        </Box>
      </Grid>
    </Grid>
  );
};
//   const classes = useStyles();
//     return (
//       <>
//       <Box  width={1} flexDirection="column">
//             {/* Column1 */}
//             <div>
//               <h5>
//                 <li>555-555-5555</li>
//                 <li>email@email.com</li>
//                 <li>Calle Falsa 123</li>
//               </h5>
//             </div>
//           <hr />
//           {/* <ReactWhatsapp
//             number="1-212-736-5000"
//             message="Chatea con nosotros!!!"
//           >
//             <WhatsAppIcon />
//             Chatea con nosotros
//           </ReactWhatsapp> */}
//       </Box>
//       <Box display="flex" justifyContent="center">
//               &copy;{new Date().getFullYear()} ECOMMERCE | Todos los derechos
//               reservados | Teminos de servicios | Politica de privacidad
//       </Box>
//     </>
//     );
// }

export default Footer