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

const RegisterForm = () => {
  const history = useHistory();
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      dni: "",
      email: "",
      password: "",
      birthDate: "1968-11-05",
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
      <Avatar className={classes.avatar}>
        <LockOpenIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="name"
              name="name"
              required
              fullWidth
              id="name"
              label="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="lastName"
              name="lastName"
              required
              fullWidth
              id="lastName"
              label="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="dni"
              name="dni"
              required
              fullWidth
              id="dni"
              label="DNI"
              value={formik.values.dni}
              onChange={formik.handleChange}
              error={formik.touched.dni && Boolean(formik.errors.dni)}
              helperText={formik.touched.dni && formik.errors.dni}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="password"
              required
              fullWidth
              id="password"
              label="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="email"
              required
              fullWidth
              id="email"
              label="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="birthDate"
              required
              fullWidth
              type="date"
              id="birthDate"
/*               InputLabelProps={{
                shrink: true,
              }} */
              label=""
              value={formik.values.birthDate}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="address"
              required
              fullWidth
              id="address"
              label="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="country"
              required
              fullWidth
              id="country"
              label="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
            />
          </Grid>
          {/* NUMERO DE CELULAR */}
          <Grid item xs={12} sm={6}>
            <FormControl>
              <InputLabel htmlFor="formatted-text-mask-input">
                Phone
              </InputLabel>
              <Input
                name="phone"
                id="formatted-text-mask-input"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl required className={classes.formControl}>
              <InputLabel htmlFor="outlined-gender-native-simple">
                Gender
              </InputLabel>
              <Select
                native
                inputProps={{
                  name: "gender",
                  id: "outlined-gender-native-simple",
                }}
                label="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
              >
                <option aria-label="None" value="" />
                <option value={0}>Female</option>
                <option value={1}>Male</option>
                <option value={2}>Prefer not to say</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Button xs={12} fullWidth variant="outlined" type="submit">
            Register
          </Button>
        </Grid>
      </form>
    </Container>
  );
};

export default RegisterForm;
