import * as React from "react";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { WithStyles, createStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
  createStyles({
    footer: {
      color: theme.palette.grey["50"],
      background: theme.palette.grey["A700"],
      boxSizing: "border-box",
      padding: "50px"
    }
  });

interface Props extends WithStyles<typeof styles> {}

class Footer extends React.Component<Props, {}> {
  render() {
    const { classes } = this.props;
    return <div className={classes.footer}>2019© Galgo μτ</div>;
  }
}

export default withStyles(styles)(Footer);
