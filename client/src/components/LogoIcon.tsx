import * as React from "react";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { WithStyles, createStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as Logo from "../../media/galgo-mutau-logo.svg";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    grow: {
      flexGrow: 1
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20
    }
  });

interface Props extends WithStyles<typeof styles> {}

function LogoIcon(props: Props) {
  return <img width={32} height={32} src={Logo} />;
}

export default withStyles(styles)(LogoIcon);
