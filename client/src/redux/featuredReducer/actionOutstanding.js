import axios from "axios"
export const GET_OUTSTANDING = 'GET_OUTSTANDING';

export const getGetOutstanding = () => (dispatch) => {
    axios
      .get(`/get/outstanding`)
      .then((outstanding) => {
        dispatch({
          type: GET_OUTSTANDING,
          payload: outstanding,
        });
      })
      .catch((err) => console.log(err));
}