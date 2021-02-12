import { Button, Grid, Paper, Typography, TextField } from '@material-ui/core'
import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { SketchPicker } from 'react-color'


const useStyles = makeStyles((theme) => ({
    card: {
     minWidth: "50%",
     maxWidth: "90%",
     margin: "auto",
     marginTop: "1rem",
     padding: "1%"
   },
   margin: {
     margin: theme.spacing(1),
   },
   title: {
    flex: '1 1 100%',
    },
    inputs: {
        height: "50",
    }
 }));

const PalleteDashboard = () => {
    const classes = useStyles();
    const [palleteName, setPalleteName] = useState("")


    return (
        <>
            <Paper className={classes.card} elevation={5}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                            Color Picker
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.title} variant="subtitle2" id="tableTitle" component="div">
                            Here you can change the colors from the pallete of the page. Take careful all changes will be apply to all the users online 
                        </Typography>
                    </Grid>
                    <Grid item container>
                        <Grid item>
                            <TextField
                                className={classes.inputs}
                                id="palleteName"
                                label="palleteName"
                                name="palleteName"
                                variant="outlined"
                                fullWidth
                                value={palleteName}
                            />
                        </Grid>
                        <Grid item>
                        <SketchPicker />
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default PalleteDashboard
