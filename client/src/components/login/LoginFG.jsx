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

  const loginGoogle = (values) => {
    axios
      .get("/auth/login/google", values)
      .then((res) => {
        if (res.data.message) {
          alert(res.data.message);
        } else {
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

  const loginFace = (values) => {
    axios
      .get("/auth/login/facebook", values)
      .then((res) => {
        if (res.data.message) {
          alert(res.data.message);
        } else {
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

  return (
    <div>
      <Button variant="outlined" className="gmail-user" onClick={loginGoogle}>
        <GoogleLogin fill="red" />
      </Button>
      <Button variant="outlined" className="face-user" onClick={loginFace}>
        <FacebookLogin fill="blue" />
      </Button>
    </div>
  );
};

export default LoginFG;
