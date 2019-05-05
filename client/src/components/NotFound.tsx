import * as React from "react";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { WithStyles, createStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = (theme: Theme) =>
  createStyles({
    content: {
      margin: "auto",
      padding: 10,
      fontSize: "72"
    }
  });

function NotFound(props) {
  return (
    <div className={props.classes.content}>
      <Typography variant="h1" gutterBottom>
        Error 404 uwu
      </Typography>
    </div>
  );
}

export default withStyles(styles)(NotFound);
