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
import axios from "axios";

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

interface Props extends WithStyles<typeof styles> {
  onStartSession(token: string): void;
  onEndSession(): void;
  token: string;
}

interface State {
  control: string;
  password: string;
  tos: boolean;
  invalidCredentials: boolean;
}

class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      control: "",
      password: "",
      tos: false,
      invalidCredentials: false
    };
  }

  handleControlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (/^[0-9]{0,8}$/.test(event.target.value)) {
      this.setState({
        control: event.target.value,
        invalidCredentials: false
      });
    }
  };

  handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (/^.{0,10}$/.test(event.target.value)) {
      this.setState({
        password: event.target.value,
        invalidCredentials: false
      });
    }
  };

  handleTosChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ tos: event.target.checked });
  };

  handleNext = (event: React.MouseEvent<HTMLElement>) => {
    axios
      .post("http://localhost:8080/api/v1/grupos", this.state)
      .then(
        function(response: { data: string }) {
          this.setState({ invalidCredentials: false });
          this.props.onStartSession(response.data);
        }.bind(this)
      )
      .catch(
        function(response: { data: string }) {
          this.setState({ invalidCredentials: true });
          this.props.onEndSession();
        }.bind(this)
      );
  };

  render() {
    const { token, classes } = this.props;
    const { control, password, tos, invalidCredentials } = this.state;
    if (token) {
      return <Redirect to="/" />;
    }
    return (
      <div className={classes.center}>
        <Paper className={classes.login}>
          <Typography variant="h4" gutterBottom>
            Acceder
          </Typography>
          <TextField
            id="control"
            label="Número de control"
            className={classes.textField}
            value={control}
            onChange={this.handleControlChange}
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

export default withStyles(styles)(Login);
