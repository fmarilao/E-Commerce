import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ListOrders from './ordersList/ListOrders';
import EditModal from './EditModal'

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(14),
        height: theme.spacing(14),
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(2)
    },
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 25,
        marginBottom: theme.spacing(3),
        fontWeight: 'bold'
    },
    subTitle: {
        fontSize: 18,
        marginBottom: theme.spacing(3),
        fontWeight: 'bold'
      },
    pos: {
        marginBottom: 7,
    },
    button: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
  }));

export default function Profile() {
    const userId = localStorage.getItem('userId')
    const [user, setUser] = useState({})
    const classes = useStyles();

    useEffect( () => {
        axios.get(`/users/${userId}`).then(res =>  setUser(res.data))
        .catch(err => console.log(err)) }, [userId] )

    return (
        <>
        <Grid item container direction="column">
            <Grid item container justify="center" xs={12} direction="column" >
                <Grid item container justify="center">
                    <Avatar alt={`${user.name} ${user.lastName}`} src={user.image} className={classes.large} />
                </Grid>
                <Grid item container justify="center">
                    <Typography component={'div'} className={classes.title} color="textPrimary" gutterBottom>
                        {`${user.name} ${user.lastName}`}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container justify="space-around" direction="row" sm={12}>
                <Grid item sm={3}>
                    <Card className={classes.root} variant="outlined">
                        <CardContent>
                        <Typography component={'div'} className={classes.title} color="textSecondary" gutterBottom>
                            {user.email}
                        </Typography>
                        <Typography component={'div'} className={classes.pos} color="textPrimary">
                            <strong>DNI:</strong> {user.dni}
                        </Typography>
                        <Typography component={'div'} className={classes.pos} color="textPrimary">
                            <strong>Bithdate:</strong> {user.birthDate}
                        </Typography>
                        <Typography component={'div'} className={classes.pos} color="textPrimary">
                            <strong>Country:</strong> {user.country}
                        </Typography>
                        <Typography component={'div'} className={classes.pos} color="textPrimary">
                            <strong>Address:</strong> {user.address}
                        </Typography>
                        <Typography component={'div'} className={classes.pos} color="textPrimary">
                            <strong>Phone Number:</strong> {user.phone}
                        </Typography>
                        </CardContent>
                        <CardActions className={classes.button}>
                            <EditModal user={user} />
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item sm={7}>
                    <ListOrders />
                </Grid>
            </Grid>

        </Grid>
        </>
    )
}
