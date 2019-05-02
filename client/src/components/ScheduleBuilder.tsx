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
import { Radar } from "react-chartjs-2";
import SessionContext from "./SessionContext";
import ScheduleCard from "./ScheduleCard";
import Group from "../models/group/Group";
import Schedule from "../models/schedule/Schedule";
import { Generation } from "mutau";

const styles = (theme: Theme) => {
  return createStyles({
    paper: {
      boxSizing: "border-box",
      padding: 30
    },
    button: {
      margin: theme.spacing.unit
    },
    textField: {
      margin: theme.spacing.unit
    }
  });
};

interface Props extends WithStyles<typeof styles> {
  generation: Generation<Schedule>;
}

interface State {
  current: [number[], Schedule];
}

class ScheduleBuilder extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { current: null };
  }

  render() {
    const {} = this.state;
    const { classes } = this.props;
    const [_, frontier] = this.props.generation.population.frontiers.last();
    const current = frontier.optimals.last();
    console.log(current);
    const data = {
      labels: [
        "Materias",
        "Maestros",
        "Horas libres",
        "Hora de entrada",
        "Hora de salida"
      ],
      datasets: [
        {
          label: "Óptimo",
          backgroundColor: "rgba(179,181,198,0.2)",
          borderColor: "rgba(179,181,198,1)",
          pointBackgroundColor: "rgba(179,181,198,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(179,181,198,1)",
          data: [10, 10, 0, 10, 10]
        },
        {
          label: "Aptitud",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          pointBackgroundColor: "rgba(255,99,132,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(255,99,132,1)",
          data: current[0]
        }
      ]
    };
    return (
      <Paper className={classes.paper}>
        <ScheduleCard schedule={current[1]} />
        <br />
        <Radar
          width={300}
          height={300}
          data={data}
          options={{ maintainAspectRatio: false }}
        />
      </Paper>
    );
  }
}

ScheduleBuilder.contextType = SessionContext;

export default withStyles(styles)(ScheduleBuilder);
