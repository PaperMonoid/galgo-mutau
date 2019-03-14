import "./App.css";
import * as React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { WithStyles, createStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "./AppBar";
import Footer from "./Footer";
import Home from "./Home";
import Login from "./Login";

const styles = (theme: Theme) =>
  createStyles({
    app: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh"
    },
    content: {
      background: theme.palette.grey["50"],
      flexGrow: 1,
      marginTop: 64
    }
  });

interface Props extends WithStyles<typeof styles> {}

class App extends React.Component<Props, {}> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.app}>
        <AppBar auth={true} />
        <div className={classes.content}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/inicio-sesion" component={Login} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(styles)(App);
