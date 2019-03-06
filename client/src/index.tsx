import "typeface-roboto";
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/App";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import pink from "@material-ui/core/colors/pink";
const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: pink
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("app")
);
