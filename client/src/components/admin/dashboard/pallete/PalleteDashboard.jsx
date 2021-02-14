import { Button, Divider, Grid, IconButton, InputBase, List, Paper, Typography, ListItemSecondaryAction, ListItem, ListItemText, InputLabel, Select } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import { default as DirectionsIcon, default as SaveIcon } from '@material-ui/icons/Directions';
import React, { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import { getAllPalettes, updatePalette, filterPalette, addPalette, removePalette } from '../../../../redux/paletteReducer/actionPalette';
import Swal from 'sweetalert2';
import clsx from 'clsx';
import createPalette from '@material-ui/core/styles/createPalette';


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
    colorNames: {
    flex: '1 1 100%',
    fontWeight: "bolder"
    },
    inputs: {
        height: "50",
    },
    button:{
        
        borderColor: theme.palette.primary.darker
    },
    list: {
        width: '100%',
        maxWidth: 360,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        backgroundColor: theme.palette.background.paper,
      },
    itemList:{
        '&:Focus': {
            backgroundColor: fade(theme.palette.grey[700], 0.45), 
        },
    },
    searchbar: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: "100%",
      },
      textInput: {
        marginLeft: theme.spacing(1),
        flex: 1,
      },
      iconButton: {
        padding: 10,
      },
      divider: {
        height: 28,
        margin: 4,
      },
      colorBox:{
            borderRadius: "30%",
            height:"25px",
            width:"25px",
      },
      bgGrey: {
          color: "red",         
        }
 }));

const PalleteDashboard = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [paletteName, setPaletteName] = useState("") 
    const [palette, setPalette] = useState({})
    const [isEditing, setIsEditing] = useState(true)
    const [editor, setEditor] = useState(false)
    const [colorPicker, setColorPicker] = useState(false)
    const [color, setColor] = useState("")
    const [colorKey, setColorKey] = useState("")
    const filterPalettes = useSelector(state => state.paletteReducer.filterPalettes)
    const allPalettes = useSelector(state => state.paletteReducer.allPalettes)
    const currentPalette = useSelector(state => state.paletteReducer.palette)

    useEffect(() => {
        dispatch(getAllPalettes())
    },[])

    const handlePaletteClick = (palette) => {
        if(!editor){
            if(palette.name !== currentPalette.name){
                setEditor(true)
                setPalette(palette)
            } else {
                Swal.fire('Oops...', `You can't edit the current palette<br>`, 'error')
            }
        } else {
            Swal.fire('Oops...', `You have to confirm changes before you select another palette<br>`, 'error') 
        }
    }

    const handleColorPicker = (color, key) => {
        setColor(color)
        setColorKey(key)
        setColorPicker(true)
    }

    const savePalette = () => {
        if(isEditing){
            dispatch(updatePalette(palette))
            setEditor(false)
        }
        else{
            dispatch(addPalette(palette))
            setEditor(false)
            setIsEditing(true)
            setPaletteName("")
        }
        
    }

    const paletteDetails = () => (
        <Paper component="div" style={{padding:"5%", paddingRight:"20%"}}>
            <Grid container direction="row" spacing={2}>
                <Grid item container xs={12}>
                    <Grid item container direction="column" justify="center" spacing={4}>
                        <Grid item container direction="row" justify="center" spacing={4}>
                            <Grid item>
                                <InputLabel htmlFor="outlined-type-native-simple">Type</InputLabel>
                                    <Select
                                        native
                                        value={palette.type}
                                        onChange={(e) => setPalette({...palette, type: e.target.value })}
                                        label="type"
                                        labelWidth={60}
                                        inputProps={{
                                            name: 'type',
                                            id: 'outlined-type-native-simple',
                                        }}
                                        >
                                    <option value={"light"}>Light</option>
                                    <option value={"dark"}>Dark</option>
                                </Select>
                            </Grid>
                            <Grid item>
                                <InputLabel id="status" htmlFor="status">Status</InputLabel>
                                    <Select
                                    native
                                    value={palette.status}
                                    onChange={(e) => setPalette({...palette, status: e.target.value })}
                                    label="status"
                                    labelId="status"
                                    labelWidth={60}
                                    inputProps={{
                                        name: 'status',
                                        id: 'status',
                                    }}
                                    >
                                    <option value={"active"}>Active</option>
                                    <option value={"disable"}>Disabled</option>
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid item container direction="row" justify="space-between">
                            <Grid item>
                                <Typography className={classes.colorNames} variant="subtitle2" id="tableTitle" component="div">
                                    Primary Main: 
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Paper 
                                    elevation={6} 
                                    component="div" 
                                    className={classes.colorBox} 
                                    onClick={() => handleColorPicker(palette.primaryMain, "primaryMain")} 
                                    style={{ backgroundColor: palette.primaryMain}} />
                            </Grid>
                        </Grid>
                        <Grid item container direction="row" justify="space-between">
                            <Grid item>
                                <Typography className={classes.colorNames} variant="subtitle2" id="tableTitle" component="div">
                                    Primary Darker: 
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Paper 
                                    elevation={6} 
                                    component="div" 
                                    className={classes.colorBox} 
                                    onClick={() => handleColorPicker(palette.primaryDarker, "primaryDarker")} 
                                    style={{ backgroundColor: palette.primaryDarker}} />
                            </Grid>
                        </Grid>
                        <Grid item container direction="row" justify="space-between">
                            <Grid item>
                                <Typography className={classes.colorNames} variant="subtitle2" id="tableTitle" component="div">
                                    Secondary Main: 
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Paper 
                                    elevation={6} 
                                    component="div" 
                                    className={classes.colorBox} 
                                    onClick={() => handleColorPicker(palette.secondaryMain, "secondaryMain")} 
                                    style={{ backgroundColor: palette.secondaryMain}} />
                            </Grid>
                        </Grid>
                        <Grid item container direction="row" justify="space-between">
                            <Grid item>
                                <Typography className={classes.colorNames} variant="subtitle2" id="tableTitle" component="div">
                                    Secondary Darker: 
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Paper 
                                    elevation={6} 
                                    component="div" 
                                    className={classes.colorBox}
                                    onClick={() => handleColorPicker(palette.secondaryDarker, "secondaryDarker")} 
                                    style={{ backgroundColor: palette.secondaryDarker}} />
                            </Grid>
                        </Grid>
                        <Grid item container direction="row" justify="space-between">
                            <Grid item>
                                <Typography className={classes.colorNames} variant="subtitle2" id="tableTitle" component="div">
                                    Background: 
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Paper 
                                    elevation={6} 
                                    component="div" 
                                    onClick={() => handleColorPicker(palette.background, "background")}
                                    className={classes.colorBox} 
                                    style={{ backgroundColor: palette.background}} 
                                />
                            </Grid>
                        </Grid>
                        <Grid item container justify="center">
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                className={classes.button}
                                startIcon={<SaveIcon />}
                                onClick={savePalette}
                            >
                                Confirm
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    ) 

    const handleColorChange = (color, key) => {
        setPalette({
            ...palette, 
            [key]: color
        })
        setColorPicker(false)
    }

    const handleCreatePalette = () => {
        if(allPalettes.find(({name}) => name === paletteName)){
            Swal.fire('Oops...', `That name is already used<br>`, 'error') 
        }
        else{
            createPalette()
        }
    }

    const createPalette = () => {
        setIsEditing(false)
        setPalette({
            status: 1,
            name: paletteName,
            type: 'light',
            primaryMain: '#FFF',
            primaryDarker: '#FFF',
            secondaryMain: '#FFF',
            secondaryDarker: '#FFF',
            background: '#FFF',
        })
        setEditor(true)
    }

    return (
        <>
            <Paper className={classes.card} elevation={5} style={{ padding:"2%"}}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                            Color Picker
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.title} variant="subtitle2" id="tableTitle" component="div">
                            You can change the theme colors from here. Take care, all changes will be applied to all the online users
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} justify="center" direction="row">
                    <Grid item container xs={12} sm={12} md={4} direction="column" spacing={1}>
                        <Grid item container direction="row" xs={12} spacing={2}> 
                            <Paper>
                                <div className={classes.searchbar}>
                                    <InputBase
                                        className={classes.input}
                                        value={paletteName}
                                        onChange={(e) => {dispatch(filterPalette(e.target.value)); setPaletteName(e.target.value)}}
                                        placeholder="Find or Create palette"
                                    />
                                    <Divider className={classes.divider} orientation="vertical" />
                                    <IconButton color="primary" className={classes.iconButton} aria-label="directions" onClick={handleCreatePalette}>
                                        <DirectionsIcon />
                                    </IconButton>
                                </div>
                                <List className={classes.list}>
                                    {filterPalettes.map((item) => (
                                        <ListItem button key={item.id} >
                                            <ListItemText 
                                                primary={item.name} 
                                                className={clsx(editor && item.name === palette.name && classes.bgGrey)} 
                                                onClick={() => handlePaletteClick(item)}
                                            />
                                            <ListItemSecondaryAction>
                                                {item.name !== "default" ? <IconButton 
                                                edge="end" 
                                                aria-label="delete" 
                                                onClick={() => dispatch(removePalette(item))}>
                                                    <DeleteIcon />
                                                </IconButton>: null}
                                            </ListItemSecondaryAction>
                                        </ListItem>))}
                                </List>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} sm={12} md={4} direction="column" spacing={1}>
                        {editor ? paletteDetails() : null}
                    </Grid>
                    <Grid item container xs={12} sm={12} md={4} direction="column" spacing={1}>
                        {colorPicker ? 
                        (<Grid item container xs={12} sm={4} direction="column" justify="center" alignItems="center" spacing={1}>
                            <Grid item xs={12}>
                                <SketchPicker
                                    color={color}
                                    onChange={(e) => setColor(e.hex)}
                                />
                            </Grid>
                            <Grid item xs={11}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                className={classes.button}
                                startIcon={<SaveIcon />}
                                onClick={() => handleColorChange(color, colorKey)}
                            >
                                Save
                            </Button>
                            </Grid>
                        </Grid>
                        )
                        : 
                        null}
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default PalleteDashboard
