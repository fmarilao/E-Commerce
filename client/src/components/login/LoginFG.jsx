import React from "react";
import Button from "@material-ui/core/Button";
import FacebookLogin from "./FacebookLogin";
import GoogleLogin from "./GoogleLogin";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/loginReducer/actionLogin.js";

const LoginFG = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const loginGoogle = () => {
    axios
      .get("/auth/google")
      .then((res) => {
        console.log(res);
        if (res.data.message) {
          console.log(res);
          alert(res.data.message);
        } else {
          console.log(res);
          const token = res.data;
          const user = jwt.decode(token);
          localStorage.setItem("token", token);
          dispatch(setUser(user));
          history.push("/");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  // const loginFace = () => {
  //   axios
  //     .get("/auth/facebook")
  //     .then((res) => {
  //       console.log(res);
  //       if (res.data.message) {
  //         console.log(res);
  //         alert(res.data.message);
  //       } else {
  //         console.log(res);
  //         const token = res.data;
  //         const user = jwt.decode(token);
  //         localStorage.setItem("token", token);
  //         dispatch(setUser(user));
  //         history.push("/");
  //       }
  //     })
  //     .catch((error) => {
  //       alert(error);
  //     });
  // };

  return (
    <div>
      {/* <Button variant="outlined" className="gmail-user" onClick={loginGoogle}> */}
      <Button
        variant="outlined"
        className="gmail-user"
        href="http://localhost:3001/auth/google"
      >
        <GoogleLogin fill="red" />
      </Button>
      <Button
        variant="outlined"
        className="face-user"
        href="http://localhost:3001/auth/facebook"
      >
        <FacebookLogin fill="blue" />
      </Button>
    </div>
  );
};

export default LoginFG;
