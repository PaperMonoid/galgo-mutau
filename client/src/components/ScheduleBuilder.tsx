import * as React from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { WithStyles, createStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import SessionContext from "./SessionContext";
import ScheduleCard from "./ScheduleCard";
import ScheduleGraph from "./ScheduleGraph";
import Group from "../models/group/Group";
import Schedule from "../models/schedule/Schedule";
import { Generation } from "mutau";

const styles = (theme: Theme) => {
  return createStyles({
    content: {
      display: "flex",
      boxSizing: "border-box",
      padding: 30
    },
    schedule: {
      display: "flex",
      flexDirection: "column"
    },
    growSpace: {
      flexGrow: 1
    },
    graph: {
      width: 500
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
  optimize: () => void;
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
    let { current } = this.state;
    const { classes, optimize, generation } = this.props;
    if (!current) {
      const [_, frontier] = generation.population.frontiers.last();
      current = frontier.optimals.last();
      console.log(frontier.optimals.values());
    }
    return (
      <div className={classes.content}>
        <div className={classes.schedule}>
          <ScheduleCard schedule={current[1]} />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={optimize}
          >
            Optimizar
          </Button>
        </div>
        <div className={classes.growSpace} />
        <div className={classes.graph}>
          <ScheduleGraph current={current} />
        </div>
      </div>
    );
  }
}

ScheduleBuilder.contextType = SessionContext;

export default withStyles(styles)(ScheduleBuilder);
