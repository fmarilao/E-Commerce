import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Card, Grid } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import Select from '@material-ui/core/Select';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {useDropzone} from 'react-dropzone';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete'
import axios from 'axios'


const validationSchema = yup.object({
    name: yup
    .string('Ingresa el nombre del producto')
    .min(5, 'Muy corto')
    .max(30, 'Muy largo, maximo 30 caracteres')
    .required('El nombre es obligatorio'),
    price: yup
    .number()
    .min(1,"El precio no puede ser 0")
    .required('El precio es obligatorio'),
    stock: yup
    .number()
    .min(1,"El stock tiene que ser mayor a 1")
    .required('El Stock es obligatorio'),
    description: yup
    .string('Ingrese la descripcion')
    .min(20, 'Muy corto')
    .max(1800, 'Muy largo, maximo 1800 caracteres')
    .required("La descripcion es un requisito"),
});

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };
  
  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  };
  
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };
  
  const img = {
    display: 'relative',
    width: 'auto',
    height: '100%'
  };

/*   const container = {
      display: 'flex',
      flexDirection: "row",
  } */

  const dropzone = {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: 100,
      padding: "10px",
      borderWidth: "2px",
      borderRadius: "2px",
      borderColor: "#eeeeee",
      borderStyle: "dashed",
      backgroundColor: "#fafafa",
      color: "#bdbdbd",
      outline: "none",
      transition: "border .24s ease-in-out",
  }

const useStyles = makeStyles((theme) => ({
   card: {
    maxWidth: "90%",
    margin: "auto",
    marginTop: "1rem",
    padding: "1%"
  },
  margin: {
    margin: theme.spacing(1),
  },
  inputs: {
      height: "50",
  }
}));

const addProduct = async (data, files) => {
    let links = await Upload(files)
    data.img = links
    console.log(links)
    /* axios.post('http://localhost:3001/dashboard/addProduct', data) */
     setTimeout(() => axios.post('http://localhost:3001/dashboard/addProduct', data),1500) 
}



const Upload = (files) => {
    //const url = `https://api.cloudinary.com/v1_1/${NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
    const uploadURL = 'https://api.cloudinary.com/v1_1/henry-e/image/upload';
    const uploadPreset = 'rkbb4en8';
    const apikey = "555657752225283"
    let imgLinks = []
    // https://res.cloudinary.com/henry-e/image/upload/v1611238394/%LINK%.jpg
 
    files.forEach(file => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      formData.append("api_key", apikey);
      axios.post(uploadURL, formData)
      .then(res => {
        imgLinks.push(res.data.public_id)
        console.log(res.data)
        })
      .catch(err => console.log(err))
    })

    return imgLinks
    
}

/* const Upload = (files) => {
    //const url = `https://api.cloudinary.com/v1_1/${NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
    const uploadURL = 'https://api.cloudinary.com/v1_1/henry-e/image/upload';
    const uploadPreset = 'rkbb4en8';
    const apikey = "555657752225283"
    let imgLinks = []
    // https://res.cloudinary.com/henry-e/image/upload/v1611238394/%LINK%.jpg
 
    files.forEach(file => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      formData.append("api_key", apikey);
      axios.post(uploadURL, formData)
      .then(res => {
        imgLinks.push(res.data.public_id)
        console.log(res.data)
        })
      .catch(err => console.log(err))
    })

    return imgLinks
    
} */

const AddProductDashboard = () => {
    const classes = useStyles();
    const [files, setFiles] = useState([]);
    const formik = useFormik({
        initialValues: {
        name: "",
        price: 0,
        description: "",
        feature: undefined, // 0 = false / 1 = true
        stock: 0,
        status: 1, // 0 = false / 1 = true
        img: undefined,
        //sale: 0, // 0 = false / 1 = true
        //category: [],
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            addProduct(values, files)
            formik.resetForm({})
            setFiles([])
        },
    })
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
      accept: 'image/*',
      multiple:  true,
      maxFiles: 3,
      onDrop: acceptedFiles => {
          if(files.length === 3){
              console.log("Maxima cantidad de imagenes ingresadas")
          }
          else{
                setFiles(files.concat(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)})
                )))
            }
      }
    })
    const handleDelete = (name) => {
        setFiles(files.filter(file => file.name !== name))
    } 
    const thumbs = files.map((file,i) => (
      <div key={i}>
          <div style={thumb} >
              <div style={thumbInner}> 
                  <img key={file.name} src={file.preview} style={img}alt={""}/>
              </div>
          </div>
          <IconButton key={i} onClick={() => handleDelete(file.name)} aria-label="delete" >
              <DeleteIcon />
          </IconButton> 
      </div>
    ));

    return (
        <>
         <Card className={classes.card}>
            <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
                <Grid container spacing={3} justify="center">
                    <Grid item xs={12} sm={8} >
                        <TextField
                            className={classes.inputs}
                            required
                            id="name"
                            label="Nombre"
                            name="name"
                            variant="outlined"
                            fullWidth
                            
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl  className={classes.mr}  fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-amount">Precio</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                name="price"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                labelWidth={60}
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                error={formik.touched.price && Boolean(formik.errors.price)}
                            />
                        </FormControl>                        
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="stock"
                            label="Stock"
                            name="stock"
                            variant="outlined"
                            fullWidth
                            value={formik.values.stock}
                            onChange={formik.handleChange}
                            error={formik.touched.stock && Boolean(formik.errors.stock)}
                            helperText={formik.touched.stock && formik.errors.stock}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl variant="outlined" fullWidth className={classes.mr}>
                            <InputLabel htmlFor="outlined-status-native-simple">Estado</InputLabel>
                                <Select
                                native
                                value={formik.values.status}
                                onChange={formik.handleChange}
                                label="status"
                                labelWidth={60}
                                inputProps={{
                                    name: 'status',
                                    id: 'outlined-status-native-simple',
                                }}
                                >
                                <option aria-label="None" value="" />
                                <option value={1}>Active</option>
                                 <option value={0}>Disable</option>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl variant="outlined" fullWidth className={classes.mr}>
                            <InputLabel htmlFor="outlined-feature-native-simple">Destacado</InputLabel>
                                <Select
                                native
                                value={formik.values.feature}
                                onChange={formik.handleChange}
                                label="Destacado"
                                labelWidth={60}
                                inputProps={{
                                    name: 'feature',
                                    id: 'outlined-features-native-simple',
                                }}
                                >
                                <option aria-label="None" value="" />
                                <option value={1}>Active</option>
                                 <option value={0}>Disable</option>
                            </Select>
                        </FormControl>
                    </Grid>
                   {/*  {Agregar  funcionalidad para insertarle categorias al producto} */ }    
                    <Grid item xs={12}>
                        <section className="container">
                            <Grid container alignItems="center" direction="row" spacing={5}>
                                <Grid item>
                                    <div style={dropzone}{...getRootProps() }>
                                        <input {...getInputProps()} />
                                            {
                                                isDragActive ?
                                                <p>Arrastra la imagen Aqui ...</p> :
                                                <p>Arrastra la imagen aqui o haz click para subir la imagen</p>
                                            }
                                    </div>
                                </Grid>
                                <Grid item>
                                    <div>
                                        <aside style={thumbsContainer}>
                                            {thumbs}
                                        </aside>
                                    </div>
                                </Grid>
                            </Grid>
                        </section>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Descripcion"
                            name="description"
                            multiline
                            rows={4}
                            variant="outlined"
                            fullWidth
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                    </Grid>
                    <Grid item container xs={12} justify="flex-end">
                        <Fab
                            variant="extended"
                            size="small"
                            color="primary"
                            aria-label="add"
                            className={classes.margin}
                            type="submit"
                            >
                            <NavigationIcon className={classes.extendedIcon} />
                            Agregar
                        </Fab>
                    </Grid>
                </Grid>
            </form>
            </Card>
        </>
        )

}

export default AddProductDashboard