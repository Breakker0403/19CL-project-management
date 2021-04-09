import 'core-js/es/map';
import 'core-js/es/set';
import 'raf/polyfill';

import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ToastContainer } from 'react-toastify';
import './App.scss';
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';

import Routes from './routes';

const theme = createMuiTheme({
  breakpoints: {
    hd1080: '@media (max-width: 1920px) and (max-height: 1080px)',
    sxgaPlus: '@media (max-width: 1400px) and (max-height: 1050px)',
    sxga: '@media (max-width: 1280px) and (max-height: 1024px)',
    wxga: '@media (max-width: 1280px) and (max-height: 768px)',
    wsvga: '@media (max-width: 1280px) and (max-height: 600px)',
  }
});

function App() {

  return (
    <>
      <MuiThemeProvider theme={theme}>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes />
      </MuiThemeProvider>
    </>
  );
}

export default App;
