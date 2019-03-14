import * as React from "react";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { WithStyles, createStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as Logo from "../../media/galgo-mutau-logo.svg";

const styles = (theme: Theme) => createStyles({});

interface Props extends WithStyles<typeof styles> {
  width: number;
  height: number;
}

function LogoIcon(props: Props) {
  const { classes } = props;
  return <img width={props.width} height={props.height} src={Logo} />;
}

export default withStyles(styles)(LogoIcon);
