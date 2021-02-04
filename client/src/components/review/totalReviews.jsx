import React from "react";
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


//el total value va a estar mirando la tabla que nos va a dar el promedio del value 

export default function TotalReviews() {
    return (
      <div>
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Typography component="legend">Total Rating</Typography>
          <Rating name="read-only" value={3} readOnly />
        </Box>
      </div>
    );
 

  
}
//avatar
//autor
//estrellas
//descriptio
