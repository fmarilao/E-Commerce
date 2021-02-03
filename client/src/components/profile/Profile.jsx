import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ListOrders from './ordersList/ListOrders';
import EditModal from './EditModal';
import Badge from '@material-ui/core/Badge';
import EditIcon from '@material-ui/icons/Edit';
import {useDropzone} from 'react-dropzone';

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(22),
        height: theme.spacing(22),
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(2)
    },
    root: {
        marginTop: 18,
        minWidth: 350
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

const chipStyles = {
    backgroundColor:'#d4cfc9',
    borderRadius: '200px 200px 200px 200px',
    width: '35px',
    height: '35px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
}

export default function Profile() {
    const classes = useStyles();
    const userId = localStorage.getItem('userId')
    const [user, setUser] = useState({})
    const [url, setUrl] = useState('')

    const initialUser = () => {
        axios.get(`/users/${userId}`).then(res =>  {
            setUser(res.data)
            setUrl(user.image)
        })
        .catch(err => console.log(err))
    }

    useEffect( initialUser, [userId] )

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: 'image/*',
        multiple:  false,
        onDrop: acceptedFiles => {
            const uploadURL = 'https://api.cloudinary.com/v1_1/henry-e/image/upload';
            const uploadPreset = 'rkbb4en8';
            const apikey = "555657752225283"

            const formData = new FormData();
            formData.append('file', acceptedFiles);
            formData.append('upload_preset', uploadPreset);
            formData.append("api_key", apikey);

            fetch(uploadURL,{
                method: "POST",
                body: formData,
              })
              .then(r => r.json())
            //   .then(response => axios.post('http://localhost:3001/dashboard/addPhotos', {url: response.url}))
              .then(res => {
                console.log(res)
              })
            
        }
      })


    return (
        <>
        <Grid item container justify="center" direction="column">

            <Grid item container justify="center">

                <Grid item container justify="center" xs={4} direction="column" >
                    <Grid item container justify="center">
                        <Badge  badgeContent={<div style={chipStyles} {...getRootProps()} > <EditIcon {...getInputProps()} /> </div>} 
                                overlap="circle"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}>
                            <Avatar alt={`${user.name} ${user.lastName}`} src={url} className={classes.large} />
                        </Badge>
                    </Grid>
                    
                    <Grid item container justify="center">
                        <Typography className={classes.title} color="textPrimary" gutterBottom>
                            {`${user.name} ${user.lastName}`}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item container justify="center" xs={7}>
                    <Grid item sm={3}>
                        <Card className={classes.root} variant="outlined">
                            <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {user.email}
                            </Typography>
                            <Typography className={classes.pos} color="textPrimary">
                                <strong>DNI:</strong> {user.dni}
                            </Typography>
                            <Typography className={classes.pos} color="textPrimary">
                                <strong>Bithdate:</strong> {user.birthDate}
                            </Typography>
                            <Typography className={classes.pos} color="textPrimary">
                                <strong>Country:</strong> {user.country}
                            </Typography>
                            <Typography className={classes.pos} color="textPrimary">
                                <strong>Address:</strong> {user.address}
                            </Typography>
                            <Typography className={classes.pos} color="textPrimary">
                                <strong>Phone Number:</strong> {user.phone}
                            </Typography>
                            </CardContent>
                            <CardActions className={classes.button}>
                                <EditModal user={user} initialUser={initialUser} />
                            </CardActions>
                        </Card>
                    </Grid>

                </Grid>

            </Grid>

            <Grid item container justify="space-around" direction="row" sm={12}>
                <Grid item sm={10}>
                    <ListOrders />
                </Grid>
            </Grid>

        </Grid>
        </>
    )
}
