import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/routes';
import { useDispatch } from 'react-redux';
import jwt from "jsonwebtoken";
import { setUser } from './redux/loginReducer/actionLogin.js'
import axios from 'axios'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

function App() {

  const palette = useSelector(state => state.paletteReducer.palette)


  const dispatch = useDispatch();

  var theme = createMuiTheme({
    palette: {
      type: palette.type,
      primary: {
        main: palette.primaryMain,
      },
      secondary: {
        main: palette.secondaryMain,
        darker: palette.secondaryDarker,
      },
    },
  });

   useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      const user = jwt.decode(token);
      if (user.email) {
        dispatch(setUser(user));
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    }

/*     theme = createMuiTheme({
      palette: {
        type: palette.type,
        primary: {
          main: palette.primaryMain,
        },
        secondary: {
          main: palette.secondaryMain,
          darker: palette.secondaryDarker,
        },
      },
    }); */

  }, [dispatch, palette])

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;