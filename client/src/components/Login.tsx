import * as React from "react";
import { Link } from "react-router-dom";
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
}

interface State {
  controlNumber: string;
  password: string;
  tos: boolean;
}

class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      controlNumber: "",
      password: "",
      tos: false
    };
  }

  handleControlNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ controlNumber: event.target.value });
  };

  handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value });
  };

  handleTosChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ tos: event.target.checked });
  };

  handleNext = (event: React.MouseEvent<HTMLElement>) => {
    axios
      .post("/api/v1/login", this.state)
      .then(
        function(response: { data: string }) {
          this.props.onStartSession(response.data);
        }.bind(this)
      )
      .catch(
        function(response: { data: string }) {
          this.props.onEndSession();
        }.bind(this)
      );
  };

  render() {
    const { classes } = this.props;
    const { controlNumber, password, tos } = this.state;
    return (
      <div className={classes.center}>
        <Paper className={classes.login}>
          <Typography variant="h4" gutterBottom>
            Acceder
          </Typography>
          <TextField
            id="controlNumber"
            label="Número de control"
            className={classes.textField}
            value={controlNumber}
            onChange={this.handleControlNumberChange}
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
