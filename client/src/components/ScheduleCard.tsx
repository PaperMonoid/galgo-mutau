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
import { Radar } from "react-chartjs-2";
import Schedule from "../models/schedule/Schedule";

const styles = (theme: Theme) => {
  return createStyles({
    card: {
      display: "flex",
      boxSizing: "border-box",
      padding: 30
    },
    details: {
      display: "flex",
      flexDirection: "column"
    },
    content: {
      flex: "1 0 auto"
    },
    cover: {
      width: 151
    },
    controls: {
      display: "flex",
      alignItems: "center",
      paddingLeft: theme.spacing.unit,
      paddingBottom: theme.spacing.unit
    },
    playIcon: {
      height: 38,
      width: 38
    }
  });
};

interface Props extends WithStyles<typeof styles> {
  schedule: Schedule;
}

interface State {}

class ScheduleCard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { classes, schedule } = this.props;
    return (
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              Horario
            </Typography>
            {schedule &&
              schedule.groups.map(group => (
                <Typography variant="subtitle1" color="textSecondary">
                  {group.name}
                </Typography>
              ))}
          </CardContent>
          <div className={classes.controls}>FOO</div>
        </div>
        <div className={classes.cover}>BAR</div>
      </Card>
    );
  }
}

export default withStyles(styles)(ScheduleCard);
