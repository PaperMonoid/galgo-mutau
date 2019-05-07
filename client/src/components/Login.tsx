import * as React from "react";
import { Link, Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { WithStyles, createStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import SessionContext from "./SessionContext";
import SessionFactory from "../models/session/SessionFactory";

const styles = (theme: Theme) => {
  const _secondary = theme.palette.secondary as any;
  const secondary = _secondary as { [200]: string };
  return createStyles({
    button: {
      margin: theme.spacing.unit
    },
    textField: {
      margin: theme.spacing.unit
    },
    center: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxSizing: "border-box",
      padding: 50
    },
    floatRight: {
      float: "right"
    },
    login: {
      boxSizing: "border-box",
      padding: 30,
      width: 600
    },
    hyperlink: {
      color: theme.palette.primary.main
    }
  });
};

interface Props extends WithStyles<typeof styles> {}

interface State {
  username: string;
  password: string;
  tos: boolean;
  invalidCredentials: boolean;
  invalidTos: boolean;
}

class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      tos: false,
      invalidCredentials: false,
      invalidTos: false
    };
  }

  handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (/^[0-9]{0,8}$/.test(event.target.value)) {
      this.setState({
        username: event.target.value,
        invalidCredentials: false,
        invalidTos: false
      });
    }
  };

  handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (/^.{0,10}$/.test(event.target.value)) {
      this.setState({
        password: event.target.value,
        invalidCredentials: false,
        invalidTos: false
      });
    }
  };

  handleTosChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      tos: event.target.checked,
      invalidCredentials: false,
      invalidTos: false
    });
  };

  onError = (error: Error) => {
    switch (error.message) {
      case "Invalid credentials":
        this.setState({ invalidCredentials: true });
        break;
      case "Invalid terms of service":
        this.setState({ invalidTos: true });
        break;
    }
  };

  handleNext = (event: React.MouseEvent<HTMLElement>) => {
    const { onError } = this;
    const { username, password, tos } = this.state;
    const { session, onChange } = this.context;
    SessionFactory.createFromNetwork(username, password, tos)
      .then(onChange)
      .catch(onError);
  };

  render() {
    const {
      username,
      password,
      tos,
      invalidCredentials,
      invalidTos
    } = this.state;
    const { classes } = this.props;
    const { session } = this.context;
    if (session) {
      return <Redirect to="/" />;
    }
    return (
      <div className={classes.center}>
        <Paper className={classes.login}>
          <Typography variant="h4" gutterBottom>
            Acceder
          </Typography>
          <TextField
            id="username"
            label="Número de control"
            className={classes.textField}
            value={username}
            onChange={this.handleUsernameChange}
            margin="normal"
            fullWidth
            autoFocus
          />
          <TextField
            id="password"
            label="Contraseña"
            className={classes.textField}
            margin="normal"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={this.handlePasswordChange}
            fullWidth
          />
          <Typography variant="caption" gutterBottom>
            <Checkbox
              checked={this.state.tos}
              onChange={this.handleTosChange}
            />{" "}
            He leído y estoy de acuerdo con los{" "}
            <Link to="/terminos-y-condiciones" className={classes.hyperlink}>
              {" "}
              términos y condiciones
            </Link>
          </Typography>
          {invalidCredentials && (
            <Typography variant="caption" color="secondary" gutterBottom>
              Credenciales inválidas.
            </Typography>
          )}
          {invalidTos && (
            <Typography variant="caption" color="secondary" gutterBottom>
              Debe aceptar los términos y condiciones para continuar.
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            className={[classes.button, classes.floatRight].join(" ")}
            onClick={this.handleNext}
          >
            Siguiente
          </Button>
        </Paper>
      </div>
    );
  }
}

Login.contextType = SessionContext;

export default withStyles(styles)(Login);
