import * as React from "react";
import { Link } from "react-router-dom";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { WithStyles, createStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Book from "@material-ui/icons/Book";
import Switch from "@material-ui/core/Switch";
import Drawer from "@material-ui/core/Drawer";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Chip from "@material-ui/core/Chip";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import LogoIcon from "./LogoIcon";
import SessionContext from "./SessionContext";
import SessionFactory from "../models/session/SessionFactory";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300
    }
  }
};

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    grow: {
      flexGrow: 1
    },
    logoButton: {
      display: "flex",
      textDecoration: "none",
      color: "black"
    },
    noDecoration: {
      textDecoration: "none",
      color: "black"
    },
    docsButton: {
      display: "flex",
      textDecoration: "none",
      color: "black",
      marginLeft: 10,
      marginRight: 10
    },
    buttonText: {
      marginLeft: 10
    },
    logoText: {
      marginLeft: 10
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20
    },
    drawerContents: {
      padding: 30
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 300,
      maxWidth: 300
    },
    chips: {
      display: "flex",
      flexWrap: "wrap"
    },
    chip: {
      margin: theme.spacing.unit / 4
    }
  });

interface Props extends WithStyles<typeof styles> {}

interface State {
  anchorEl: HTMLElement;
  drawer: boolean;
  selectedTeachers: string[];
  selectedSubjects: string[];
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      anchorEl: null,
      drawer: false,
      selectedTeachers: [],
      selectedSubjects: []
    };
  }

  handleSelectedTeachers = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({ selectedTeachers: value });
  };

  handleSelectedSubjects = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({ selectedSubjects: value });
  };

  handleDrawer = (event: React.MouseEvent<HTMLElement>): void => {
    const { session } = this.context;
    if (session) {
      this.setState({ drawer: !this.state.drawer });
    } else {
      this.setState({ drawer: false });
    }
  };

  handleHorario = (event: React.MouseEvent<HTMLElement>): void => {
    this.setState({ anchorEl: null });
  };

  handleMenu = (event: React.MouseEvent<HTMLElement>): void => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (): void => {
    this.setState({ anchorEl: null });
  };

  handleCloseSession = (): void => {
    const { onChange } = this.context;
    this.setState({ anchorEl: null, drawer: false });
    SessionFactory.createEmpty().then(function(_) {
      onChange(null);
    });
  };

  render() {
    const { anchorEl, drawer } = this.state;
    const { classes } = this.props;
    const { session } = this.context;
    let teachers = [];
    let subjects = [];
    if (session && session.groups) {
      function distinct(value, index, self) {
        return self.indexOf(value) === index;
      }
      teachers = session.groups.map(group => group.teacher).filter(distinct);
      subjects = session.groups.map(group => group.name).filter(distinct);
    }
    const open = Boolean(anchorEl);
    return (
      <div>
        <AppBar position="fixed">
          <Toolbar>
            {session && (
              <IconButton
                onClick={this.handleDrawer}
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
              >
                <MenuIcon />
              </IconButton>
            )}
            <Link to="/" className={classes.logoButton}>
              <LogoIcon width={32} height={32} />
              <Typography
                variant="h6"
                color="inherit"
                className={classes.logoText}
              >
                Galgo μτ
              </Typography>
            </Link>
            <div className={classes.grow} />
            <Link to="/documentacion" className={classes.docsButton}>
              <Button color="default">
                <Book />
                <span className={classes.buttonText}>Documentación</span>
              </Button>
            </Link>
            {session && (
              <div>
                <IconButton
                  aria-owns={open ? "menu-appbar" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleHorario}>
                    <Link to="/horario" className={classes.noDecoration}>
                      Horario
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={this.handleCloseSession}>
                    Cerrar sesión
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
        <Drawer open={drawer} onClose={this.handleDrawer}>
          <div className={classes.drawerContents}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="select-multiple-chip">
                Maestros deseados
              </InputLabel>
              <Select
                multiple
                value={this.state.selectedTeachers}
                onChange={this.handleSelectedTeachers}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected: string[]) => (
                  <div className={classes.chips}>
                    {selected.map(value => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {teachers.map(teacher => (
                  <MenuItem key={teacher} value={teacher}>
                    {teacher}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="select-multiple-chip">
                Materias deseadas
              </InputLabel>
              <Select
                multiple
                value={this.state.selectedSubjects}
                onChange={this.handleSelectedSubjects}
                input={<Input id="select-multiple-chip-2" />}
                renderValue={(selected: string[]) => (
                  <div className={classes.chips}>
                    {selected.map(value => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {subjects.map(subject => (
                  <MenuItem key={subject} value={subject}>
                    {subject}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
            <Button variant="contained" color="secondary">
              Eliminar datos
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

App.contextType = SessionContext;

export default withStyles(styles)(App);
