import "./App.css";
import * as React from "react";
import {
  Switch,
  BrowserRouter as Router,
  Redirect,
  Route
} from "react-router-dom";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { WithStyles, createStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "./AppBar";
import Footer from "./Footer";
import Home from "./Home";
import Login from "./Login";
import Documentation from "./Documentation";
import NotFound from "./NotFound";
import ScheduleBuilder from "./ScheduleBuilder";
import SessionContext from "./SessionContext";
import Session from "../models/session/Session";
import SessionFactory from "../models/session/SessionFactory";
import Schedule from "../models/schedule/Schedule";
import Algorithm from "../models/optimization/Algorithm";
import { Generation } from "mutau";

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
  session: Session;
  onChange(session: Session): void;
  generation: Generation<Schedule>;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      session: null,
      onChange: this.onChange,
      generation: new Algorithm([]).generation
    };
    SessionFactory.createDefault()
      .then(this.onChange)
      .catch(function() {});
  }

  onChange = (session: Session) => {
    this.setState({
      session: session,
      generation: new Algorithm((session && session.groups) || []).generation
    });
  };

  render() {
    const { classes } = this.props;
    const { session, generation } = this.state;
    return (
      <SessionContext.Provider value={this.state}>
        <div className={classes.app}>
          <AppBar />
          <div className={classes.content}>
            <Switch>
              <Route exact path="/" render={props => <Home {...props} />} />
              <Route
                exact
                path="/horario"
                render={props => (
                  <ScheduleBuilder generation={generation} {...props} />
                )}
              />
              <Route
                exact
                path="/documentacion"
                render={props => <Documentation {...props} />}
              />
              {!session ? (
                <Route
                  exact
                  path="/inicio-sesion"
                  render={props => <Login {...props} />}
                />
              ) : (
                <Redirect to="/" />
              )}
              <Route exact path="/*" component={NotFound} />
            </Switch>
          </div>
          <Footer />
        </div>
      </SessionContext.Provider>
    );
  }
}

export default withStyles(styles)(App);
