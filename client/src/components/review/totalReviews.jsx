import React, {useEffect, useState} from "react";
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import { useParams } from 'react-router-dom';


export default function TotalReviews() {

  const[average, setAverage] = useState('');
  const { id } = useParams();

  const getItemAverage = () => {
    axios.get(`/reviews/${id}/avg`).then((res) => setAverage(res.data));
  }
  useEffect(getItemAverage, [])
  
    return (
      <div>
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Rating
            name="half-rating-read"
            value={average}
            readOnly
            precision={0.25}
          />
        </Box>
      </div>
    );
 

  
}

