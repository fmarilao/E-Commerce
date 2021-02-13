import React, { useState } from 'react'
import { Grid, Typography, Card, CardContent, CardActionArea, Grow, Paper, Zoom } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import "./aboutTeam.css"
import {useHistory} from 'react-router-dom'
import { SocialIcon } from 'react-social-icons';

const useStyles = makeStyles( (theme) => ({
    padding: {
        marginLeft: "50px"
    },
    paper: {
        margin: theme.spacing(4),
      },
    text: {
        "&:hover": {
            color: "orange"
        }
    },
    tittle: {
                position: "relative",
                fontSize: "5vh",
                webkitTextStroke: "0.1vw secondary",
    },
    ig: { 
         
            bgColor:"#ff5a01"
        
    }

}));

export default function AboutTeam() {
  const classes = useStyles();
  const [checked, setChecked] = useState(true);
  const [checkIconOne, setCheckOne] = useState(false);
  const [checkIconTwo, setCheckTwo] = useState(false);
  const [checkIconThree, setCheckThree] = useState(false);
  const [checkIconFour, setCheckFour] = useState(false);
  const [checkIconFive, setCheckFive] = useState(false);
  const [checkIconSix, setCheckSix] = useState(false);
  const history = useHistory();

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  const handleChangeIconsCardOne = () => {
    setCheckOne((prev) => !prev);
  };
  const handleChangeIconsCardTwo = () => {
    setCheckTwo((prev) => !prev);
  };
  const handleChangeIconsCardThree = () => {
    setCheckThree((prev) => !prev);
  };
  const handleChangeIconsCardFour = () => {
    setCheckFour((prev) => !prev);
  };
  const handleChangeIconsCardFive = () => {
    setCheckFive((prev) => !prev);
  };
  const handleChangeIconsCardSix = () => {
    setCheckSix((prev) => !prev);
  };

  //contenedor de componente cards
  return (
    <Grid container direction="row" justify="space-between" alignItems="center" checked={checked}
    onLoad={handleChange}>
      <Grid xs={2} sm={2} lg={2} item></Grid>
      <Grid item container xs={8} sm={8} lg={8}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Typography color="secondary" variant="h2" className={classes.tittle} spacing={2} >Henry Team</Typography>
        </Grid>
 

        <Grid
          container
          spacing={4}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grow in={checked} style={{ transformOrigin: "0 0 0" }}>
            <Paper elevation={4} className={classes.paper}>
              <Grid item>
                <Card className={classes.root} >
                  <CardActionArea>
                    <CardContent checked={checkIconOne} onMouseEnter={handleChangeIconsCardOne} onMouseLeave={handleChangeIconsCardOne}>
                        <div className="transition">
                      <img
                        src="https://res.cloudinary.com/damdqkgms/image/upload/v1613073743/1607186828470_xe0nqx.jpg"
                        border="0"
                        height="250px"
                        weight="250px"
                        className="imgShow"
                        alt="true"
                        position="relative"

                      /> 
                      <img
                      // eslint-disable-next-line
                      alt="true"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyOLXTGB-aV-yPfpMFdY-0JHvo31pr8u375w&usqp=CAU"
                      className="momentImg"
                      height="250px"
                      weight="250px"
                      ></img>
                        </div>
                        {/* CONTENEDOR DE ICONOS REDES SOCIALES */}
                        <Zoom in={checkIconOne} >
                      <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="flex-end"
                      spacing={2}
                    >
                      {" "}
                      <Grid item className={classes.linkdn}>
                        <SocialIcon
                          url="https://www.linkedin.com/in/siri-facundo/"
                          style={{ height: 35, width: 35 }}
                        />
                      </Grid>
                      <Grid item>
                        <SocialIcon
                        className={classes.ig}
                        onMouseOver={() => {}}
                          url="http://instagram.com/"
                          style={{ height: 35, width: 35 }}
                        />
                      </Grid>
                      <Grid item className={classes.twitter}>
                        <SocialIcon       
                          url="http://twitter.com/"
                          style={{ height: 35, width: 35 }}
                        />
                      </Grid>
                    </Grid>
                     {/* CONTENEDOR DE ICONOS REDES SOCIALES */}
                     </Zoom>
                      <Grid container direction="row" justify="center">
                        <Typography
                          className={classes.text}
                          onMouseOver={() => {}}
                          onClick={() => history.push(`/Facundo-A-Siri`)}
                        >
                          Facundo Andres Siri
                        </Typography>
                      </Grid>
                    </CardContent>
                  </CardActionArea>

                </Card>
              </Grid>
            </Paper>
          </Grow>

          <Grow in={checked} style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout: 1000 } : {})}>
          <Paper elevation={4} className={classes.paper}>
          <Grid item>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardContent checked={checkIconTwo} onMouseEnter={handleChangeIconsCardTwo} onMouseLeave={handleChangeIconsCardTwo}>
                    <div className="transition">
                      <img
                        src="https://res.cloudinary.com/damdqkgms/image/upload/v1613073901/1602284447507_mbrvil.jpg"
                        border="0"
                        height="250px"
                        weight="250px"
                        className="imgShow"
                        alt="true"
                        position="relative"

                      /> 
                      <img
                      alt="true"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyOLXTGB-aV-yPfpMFdY-0JHvo31pr8u375w&usqp=CAU"
                      className="momentImg"
                      height="250px"
                      weight="250px"
                      ></img>
                        </div>

                        {/* CONTENEDOR DE ICONOS REDES SOCIALES */}
                        <Zoom in={checkIconTwo} >
                      <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="flex-end"
                      spacing={2}
                    >
                      {" "}
                      <Grid item className={classes.linkdn}>
                        <SocialIcon
                          url="https://www.linkedin.com/in/jeremias-santochi/"
                          style={{ height: 35, width: 35 }}
                        />
                      </Grid>
                      <Grid item>
                        <SocialIcon
                        className={classes.ig}
                        
                          url="http://instagram.com/"
                          style={{ height: 35, width: 35 }}
                        />
                      </Grid>
                      <Grid item className={classes.twitter}>
                        <SocialIcon       
                          url="http://twitter.com/"
                          style={{ height: 35, width: 35 }}
                        />
                      </Grid>
                    </Grid>
                     {/* CONTENEDOR DE ICONOS REDES SOCIALES */}
                     </Zoom>
                      <Grid container direction="row" justify="center">
                        <Typography
                          className={classes.text}
                          onMouseOver={() => {}}
                        >
                          Jeremias Santochi
                        </Typography>
                      </Grid>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Paper>
          </Grow>

        <Grow in={checked} style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout: 1500 } : {})}>
          <Paper elevation={4} className={classes.paper}>
          <Grid item>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardContent checked={checkIconThree} onMouseEnter={handleChangeIconsCardThree} onMouseLeave={handleChangeIconsCardThree}>
                    <div className="transition">
                      <img
                        src="https://res.cloudinary.com/damdqkgms/image/upload/v1613073900/1601878751806_fndhsn.jpg "
                        border="0"
                        height="250px"
                        weight="250px"
                        className="imgShow"
                        alt="true"
                        position="relative"
                      /> 
                      <img
                      alt="true"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyOLXTGB-aV-yPfpMFdY-0JHvo31pr8u375w&usqp=CAU"
                      className="momentImg"
                      height="250px"
                      weight="250px"
                      ></img>
                        </div>

                        {/* CONTENEDOR DE ICONOS REDES SOCIALES */}
                        <Zoom in={checkIconThree} >
                      <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="flex-end"
                      spacing={2}
                    >
                      {" "}
                      <Grid item className={classes.linkdn}>
                        <SocialIcon
                          url="https://www.linkedin.com/in/nicolas-zabattaro/"
                          style={{ height: 35, width: 35 }}
                        />
                      </Grid>
                      <Grid item>
                        <SocialIcon
                        className={classes.ig}
                          url="http://instagram.com/"
                          style={{ height: 35, width: 35 }}
                        />
                      </Grid>
                      <Grid item className={classes.twitter}>
                        <SocialIcon       
                          url="http://twitter.com/"
                          style={{ height: 35, width: 35 }}
                        />
                      </Grid>
                    </Grid>
                     {/* CONTENEDOR DE ICONOS REDES SOCIALES */}
                     </Zoom>
                      <Grid container direction="row" justify="center">
                        <Typography
                          className={classes.text}
                          onMouseOver={() => {}}
                        >
                          Nicolas Zabattaro
                        </Typography>
                      </Grid>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Paper>
          </Grow>

        <Grow in={checked} style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout: 2000 } : {})}>
          <Paper elevation={4} className={classes.paper}>
          <Grid item>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardContent checked={checkIconFour} onMouseEnter={handleChangeIconsCardFour} onMouseLeave={handleChangeIconsCardFour}>
                    <div className="transition">
                      <img
                        src="https://res.cloudinary.com/damdqkgms/image/upload/v1613073901/1600286230629_vw8yxj.jpg"
                        border="0"
                        height="250px"
                        weight="250px"
                        className="imgShow"
                        alt="true"
                        position="relative"

                      /> 
                      <img
                      alt="true"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyOLXTGB-aV-yPfpMFdY-0JHvo31pr8u375w&usqp=CAU"
                      className="momentImg"
                      height="250px"
                      weight="250px"
                      ></img>
                        </div>

                        {/* CONTENEDOR DE ICONOS REDES SOCIALES */}
                        <Zoom in={checkIconFour} >
                      <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="flex-end"
                      spacing={2}
                    >
                      {" "}
                      <Grid item className={classes.linkdn}>
                        <SocialIcon
                          url="https://www.linkedin.com/in/agustin-diego-jaime-4033041b7/"
                          style={{ height: 35, width: 35 }}
                        />
                      </Grid>
                      <Grid item>
                        <SocialIcon
                        className={classes.ig}
                          url="http://instagram.com/"
                          style={{ height: 35, width: 35 }}
                        />
                      </Grid>
                      <Grid item className={classes.twitter}>
                        <SocialIcon       
                          url="http://twitter.com/"
                          style={{ height: 35, width: 35 }}
                        />
                      </Grid>
                    </Grid>
                     {/* CONTENEDOR DE ICONOS REDES SOCIALES */}
                     </Zoom>
                      <Grid container direction="row" justify="center">
                        <Typography
                          className={classes.text}
                          onMouseOver={() => {}}
                        >
                          Agustin Diego Jaime
                        </Typography>
                      </Grid>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Paper>
          </Grow>

        <Grow in={checked} style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout: 2500 } : {})}>
          <Paper elevation={4} className={classes.paper}>
          <Grid item>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardContent checked={checkIconFive} onMouseEnter={handleChangeIconsCardFive} onMouseLeave={handleChangeIconsCardFive}>
                    <div className="transition">
                      <img
                        src="https://res.cloudinary.com/damdqkgms/image/upload/v1613073901/1608417251503_hfrdlj.jpg"
                        border="0"
                        height="250px"
                        weight="250px"
                        className="imgShow"
                        alt="true"
                        position="relative"
// eslint-disable-next-line
                      /> 
                      <img
                      alt="true"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyOLXTGB-aV-yPfpMFdY-0JHvo31pr8u375w&usqp=CAU"
                      className="momentImg"
                      height="250px"
                      weight="250px"
                      ></img>
                        </div>

                        {/* CONTENEDOR DE ICONOS REDES SOCIALES */}
                        <Zoom in={checkIconFive} >
                      <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="flex-end"
                      spacing={2}
                    >
                      {" "}
                      <Grid item className={classes.linkdn}>
                        <SocialIcon
                          url="https://www.linkedin.com/in/fmarilao/"
                          style={{ height: 35, width: 35 }}
                        />
                      </Grid>
                      <Grid item>
                        <SocialIcon
                        className={classes.ig}
                          url="http://instagram.com/"
                          style={{ height: 35, width: 35 }}
                        />
                      </Grid>
                      <Grid item className={classes.twitter}>
                        <SocialIcon       
                          url="http://twitter.com/"
                          style={{ height: 35, width: 35 }}
                        />
                      </Grid>
                    </Grid>
                     {/* CONTENEDOR DE ICONOS REDES SOCIALES */}
                     </Zoom>
                      <Grid container direction="row" justify="center">
                        <Typography
                          className={classes.text}
                          onMouseOver={() => {}}
                        >
                          Facundo Marilao
                        </Typography>
                      </Grid>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Paper>
          </Grow>


        <Grow in={checked} style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout: 3000 } : {})}>
          <Paper elevation={4} className={classes.paper}>
          <Grid item>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardContent checked={checkIconSix} onMouseEnter={handleChangeIconsCardSix} onMouseLeave={handleChangeIconsCardSix}>
                    <div className="transition">
                      <img
                        src="https://res.cloudinary.com/damdqkgms/image/upload/v1613073901/1608685332592_ux7qxv.jpg"
                        border="0"
                        height="250px"
                        weight="250px"
                        className="imgShow"
                        alt="true"
                        position="relative"
                      /> 
                      <img
                      alt="true"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyOLXTGB-aV-yPfpMFdY-0JHvo31pr8u375w&usqp=CAU"
                      className="momentImg"
                      height="250px"
                      weight="250px"
                      ></img>
                        </div>

                        {/* CONTENEDOR DE ICONOS REDES SOCIALES */}
                        <Zoom in={checkIconSix} >
                      <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="flex-end"
                      spacing={2}
                    >
                      {" "}
                      <Grid item className={classes.linkdn}>
                        <SocialIcon
                          url="https://www.linkedin.com/in/cramirezl11"
                          style={{ height: 35, width: 35 }}
                        />
                      </Grid>
                      <Grid item>
                        <SocialIcon
                        className={classes.ig}
                          url="http://instagram.com/"
                          style={{ height: 35, width: 35 }}
                        />
                      </Grid>
                      <Grid item className={classes.twitter}>
                        <SocialIcon       
                          url="http://twitter.com/"
                          style={{ height: 35, width: 35 }}
                        />
                      </Grid>
                    </Grid>
                     {/* CONTENEDOR DE ICONOS REDES SOCIALES */}
                     </Zoom>
                      <Grid container direction="row" justify="center">
                        <Typography
                          className={classes.text}
                          onMouseOver={() => {}}
                        >
                          Carlos Ramirez
                        </Typography>
                      </Grid>
                    </CardContent>
                  </CardActionArea>

                </Card>
              </Grid>
            </Paper>
          </Grow>

        </Grid>
      </Grid>
      <Grid xs={2} sm={2} lg={2} item></Grid>
    </Grid>
  );
}
