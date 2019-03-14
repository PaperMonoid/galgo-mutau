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

class Login extends React.Component<Props, {}> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.center}>
        <Paper className={classes.login}>
          <Typography variant="h4" gutterBottom>
            Acceder
          </Typography>
          <TextField
            id="nocontrol"
            label="Número de control"
            className={classes.textField}
            margin="normal"
            fullWidth
            autoFocus
          />
          <TextField
            id="clave"
            label="Contraseña"
            className={classes.textField}
            margin="normal"
            type="password"
            autoComplete="current-password"
            fullWidth
          />
          <Typography variant="caption" gutterBottom>
            <Checkbox /> He leído y estoy de acuerdo con los{" "}
            <Link to="/terminos-y-condiciones" className={classes.hyperlink}>
              {" "}
              términos y condiciones
            </Link>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={[classes.button, classes.floatRight].join(" ")}
          >
            Siguiente
          </Button>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
