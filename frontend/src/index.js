import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Mobile from "./components/Mobile/Mobile";
import MediaQuery from "react-responsive";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#EF465E",
      main: "#EF465E",
      dark: "#A38800",
      contrastText: "#000",
    },
    info: {
      light: "#000A29",
      main: "#000A29",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#b41e46",
      main: "#f99e26",
      dark: "#b41e46",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: `"Poppins", "Helvetica", "Arial", sans-serif`,
    button: {
      textTransform: "none",
    },
  },
  overrides: {
    MuiOutlinedInput: {
      root: {
        position: "relative",
        "& $notchedOutline": {
          borderColor: "#FFD500",
        },
        "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
          borderColor: "#000a29",
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            borderColor: "#000a29",
          },
        },
        "&$focused $notchedOutline": {
          borderColor: "#000a29",
          borderWidth: 1,
        },
      },
    },
    MuiFormLabel: {
      root: {
        "&$focused": {
          color: "#b41e46",
        },
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <MediaQuery query="(max-device-width: 768px)">
        <Mobile />
      </MediaQuery>
      <MediaQuery query="(min-device-width: 769px)">
        <App />
      </MediaQuery>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
