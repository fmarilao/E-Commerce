import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { Grid } from '@material-ui/core';



export default function UserRating(value) {
  let tempValue = 1;
  return (
    <Grid>
      <Box component="fieldset" mb={2} borderColor="transparent">
        <Rating name="read-only" value={tempValue} readOnly />
      </Box>
    </Grid>
  );
}
