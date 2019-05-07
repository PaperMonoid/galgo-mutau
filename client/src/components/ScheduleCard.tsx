import * as React from "react";
import Typography from "@material-ui/core/Typography";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { WithStyles, createStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Schedule from "../models/schedule/Schedule";
import Class from "../models/group/Class";

const styles = (theme: Theme) => {
  return createStyles({
    controls: {
      display: "flex",
      alignItems: "center",
      paddingLeft: theme.spacing.unit,
      paddingBottom: theme.spacing.unit
    }
  });
};

function formatClass(clazz: Class) {
  if (clazz && clazz.from && clazz.to) {
    let fromString = clazz.from.toString();
    let toString = clazz.to.toString();
    fromString = fromString.substring(0, 2) + ":" + fromString.substring(2, 4);
    toString = toString.substring(0, 2) + ":" + toString.substring(2, 4);
    return `${fromString} - ${toString}`;
  } else {
    return "";
  }
}

function ScheduleCard(props) {
  const { classes, schedule, optimize, data } = props;
  return (
    <div>
      {schedule &&
        schedule.groups.map(group => (
          <div key={group.key}>
            <Typography variant="h5" color="textSecondary">
              {group.name} {group.key}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {group.teacher}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {formatClass(group["monday"])}
            </Typography>
          </div>
        ))}
    </div>
  );
}

export default withStyles(styles)(ScheduleCard);
