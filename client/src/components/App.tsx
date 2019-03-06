import * as React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { WithStyles, createStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing.unit
    }
  });

interface Props extends WithStyles<typeof styles> {}

class App extends React.Component<Props, {}> {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography variant="h1" gutterBottom>
          Galgo μτ
        </Typography>
        <br />
        <Button variant="contained" className={classes.button}>
          Default
        </Button>
        <br />
        <Button variant="contained" color="primary" className={classes.button}>
          Primary
        </Button>
        <br />
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Secondary
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(App);
