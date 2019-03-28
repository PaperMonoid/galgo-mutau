import "typeface-roboto";
import "./index.html";
import "./media/favicon.ico";
import "./media/schedule_background.jpg";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import pink from "@material-ui/core/colors/pink";
import App from "./components/App";

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: pink
  }
});

console.log(theme);

ReactDOM.render(
  <Router>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Router>,
  document.getElementById("app")
);
