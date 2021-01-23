import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

export default function AddCategoryForm({listCategories, openClose, setOpenClose, item}) {
    const [form, setForm] = useState({name: item.name, description: item.description})
    const [errors, setErrors] = useState({})

    const handleInputChange = e => { setForm({...form, [e.target.name]: e.target.value}) }

    const validate = (form) => {
    let errors = {};
    if (!form.name) {
        errors.name = 'Tenés que escribir un nombre.';
    } 
    if (!form.description) {
        errors.description = 'Tenés que escribir una descripción.';
    }
    return errors;
    };

    const editProduct = () => {
        setErrors(validate(form))
        if(form.name !== '' && form.description !== ''){
            axios.put(`/dashboard/category/${item.id}`, {
                'name': form.name, 
                'description': form.description})
            .then(() => {
                setOpenClose(false)
                setForm({name: "", description: ""})
            })
            .then(() => listCategories())
            .catch((err) => { console.log(err); });
        }
    }

  return (
      <Dialog open={openClose} onClose={() => setOpenClose(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Editar una categoría</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombre"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            type="text"
            fullWidth
          />
          <span style={{color: 'red'}}>{errors.name}</span>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Descipción"
            name="description"
            value={form.description}
            onChange={handleInputChange}
            type="text"
            fullWidth
          />
          <span style={{color: 'red'}}>{errors.description}</span>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setOpenClose(false); setErrors({})}} color="primary">
            Cerrar
          </Button>
          <Button onClick={editProduct} color="primary">
            Editar
          </Button>
        </DialogActions>
      </Dialog>
  );
}
