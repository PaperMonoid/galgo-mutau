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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import LogoIcon from "./LogoIcon";
import SessionContext from "./SessionContext";
import SessionFactory from "../models/session/SessionFactory";

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
    }
  });

interface Props extends WithStyles<typeof styles> {}

interface State {
  anchorEl: HTMLElement;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  handleMenu = (event: React.MouseEvent<HTMLElement>): void => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (): void => {
    this.setState({ anchorEl: null });
  };

  handleCloseSession = (): void => {
    const { onChange } = this.context;
    this.setState({ anchorEl: null });
    SessionFactory.createEmpty().then(function(_) {
      onChange(null);
    });
  };

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;
    const { session } = this.context;
    const open = Boolean(anchorEl);
    return (
      <div>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
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
                  <MenuItem onClick={this.handleCloseSession}>
                    Cerrar sesión
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

App.contextType = SessionContext;

export default withStyles(styles)(App);
