import * as React from "react";
import Typography from "@material-ui/core/Typography";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { WithStyles, createStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "./AppBar";

const styles = (theme: Theme) => {
  const _secondary = theme.palette.secondary as any;
  const secondary = _secondary as { [200]: string };
  return createStyles({
    button: {
      margin: theme.spacing.unit
    },
    center: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    },
    paddedbox: {
      boxSizing: "border-box",
      padding: 30
    },
    content: {
      textAlign: "center",
      marginTop: 64,
      height: "100vh",
      width: "100%"
    }
  });
};

interface Props extends WithStyles<typeof styles> {}

class Login extends React.Component<Props, {}> {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div>
          <Typography variant="h1" gutterBottom>
            Inicio sesión
          </Typography>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
