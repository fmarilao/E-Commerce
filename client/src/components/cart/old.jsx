<Grid container spacing={3}>
<Grid item xs>
  <Paper className={classes.paper}>xs</Paper>
</Grid>
<Grid item xs>
  <Paper className={classes.paper}>xs</Paper>
</Grid>
<Grid item xs>
  <Paper className={classes.paper}>xs</Paper>
</Grid>
</Grid>
<Grid container spacing={3}>
<Grid item xs>
  <Paper className={classes.paper}>xs</Paper>
</Grid>
<Grid item xs={6}>
  <Paper className={classes.paper}>xs=6</Paper>
</Grid>
<Grid item xs>
  <Paper className={classes.paper}>xs</Paper>
</Grid>
</Grid>
  {/* Imagen */}
  <ListItem>
  <ListItemAvatar>
    <Avatar src={image}>
    </Avatar>
  </ListItemAvatar>

  {/* Nombre y Precio */}
  <ListItemText
    primary={product.name}
    secondary={numberFormat(product.price)}
  />

  {/* Manejo de Cantidades */}
    </ListItem>
    <button onClick={handleRemove}>-</button>
        <span>{counter ? storageCounter : reduxProd.localCounter}</span>
    <button onClick={handleAdd}>+</button>

  {/* Icono de eliminar el item */}
  <ListItemSecondaryAction>
    <IconButton edge="end" aria-label="delete" onClick={() => {
      dispatch(removeItem(product))
      setCart && setCart(JSON.parse(localStorage.getItem("cart")))
    }}>
      <DeleteIcon />
      </IconButton>
  </ListItemSecondaryAction>

        <Divider></Divider>