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

interface State {
  token: string;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { token: null };
  }

  onStartSession = (token: string) => {
    this.setState({ token: token });
  };

  onEndSession = () => {
    this.setState({ token: null });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.app}>
        <AppBar
          onStartSession={this.onStartSession}
          onEndSession={this.onEndSession}
          token={this.state.token}
        />
        <div className={classes.content}>
          <Switch>
            <Route
              exact
              path="/"
              render={props => <Home token={this.state.token} {...props} />}
            />
            <Route
              path="/inicio-sesion"
              render={props => (
                <Login
                  onStartSession={this.onStartSession}
                  onEndSession={this.onEndSession}
                  token={this.state.token}
                  {...props}
                />
              )}
            />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(styles)(App);
