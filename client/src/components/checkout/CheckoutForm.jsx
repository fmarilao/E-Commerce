import React from "react";
import {
  Button,
  Grid,
  Typography,
  Container,
  TextField,
  FormControl,
  InputLabel,
  Input,
  Select,
  Avatar,
} from "@material-ui/core";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";

const validationSchema = yup.object({
  name: yup
    .string("Ingresa Tu Nombre")
    .min(1, "Muy corto")
    .max(30, "Muy largo, maximo 30 caracteres")
    .required("El nombre es obligatorio"),
  lastName: yup
    .string("Tu Apellido")
    .min(1, "Muy corto")
    .max(30, "Muy largo, maximo 30 caracteres")
    .required("El nombre es obligatorio"),
  dni: yup.string("Tu DNI").required("El DNI es obligatorio"),
  email: yup
    .string("Tu email")
    .email("Email inválido")
    .required("El email es obligatorio"),
  password: yup
    .string("Tu contraseña")
    .min(6, "Tu contraseña debe tener más de 6 caracteres")
    .max(12, "Muy largo, maximo 12 caracteres")
    .required("La contraseña es obligatoria"),
  birthDate: yup.string("AAAA/MM/DD"),
  gender: yup.number(),
  address: yup.string("Tu dirección"),
  country: yup.string("Tu país"),
  phone: yup
    .string("Tu celular")
    .min(1, "Muy corto")
    .max(15, "Muy largo, maximo 30 caracteres"),
});

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 190,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(2),
    marginLeft: theme.spacing(21),
    border: "2px solid #fafafa",
  },
}));

const CheckoutForm = () => {
  const history = useHistory();
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      dni: "",
      email: "",
      password: "",
      birthDate: "1930-07-02",
      gender: 0,
      address: "",
      country: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .post("/users/", values)
        .then((res) => {
          if(res.data.message){
            alert(res.data.message);
          }
          else{
            alert("Usuario creado correctamente.");
            formik.resetForm({});
            history.push("/");
          }
          
        })
        .catch((error) => {
          alert(error);
        });
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              autoComplete="Address"
              name="Address"
              required
              fullWidth
              id="address"
              label="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              autoComplete="zip"
              name="zip"
              required
              fullWidth
              id="zip"
              label="Zip Code"
              value={formik.values.zip}
              onChange={formik.handleChange}
              error={formik.touched.zip && Boolean(formik.errors.zip)}
              helperText={formik.touched.zip && formik.errors.zip}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              name="city"
              required
              fullWidth
              id="city"
              label="City"
              value={formik.values.city}
              onChange={formik.handleChange}
              helperText={formik.touched.city && formik.errors.city}
            />
          </Grid>
         </Grid>
      </form>
    </Container>
  );
};

export default CheckoutForm;
