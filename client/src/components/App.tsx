import "./App.css";
import * as React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { WithStyles, createStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import HelpIcon from "@material-ui/icons/Help";
import InfoIcon from "@material-ui/icons/Info";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AppBar from "./AppBar";
import MascotImage from "./MascotImage";

const styles = (theme: Theme) => {
  const _secondary = theme.palette.secondary as any;
  const secondary = _secondary as { [200]: string };
  return createStyles({
    button: {
      margin: theme.spacing.unit
    },
    center: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    },
    paddedbox: {
      boxSizing: "border-box",
      padding: 30
    },
    content: {
      textAlign: "center",
      marginTop: 64,
      height: "100vh",
      width: "100%"
    },
    about: {
      "&::after": {
        content: "''",
        display: "block",
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        background:
          "url('/media/schedule_background.jpg') no-repeat fixed center",
        zIndex: -1,
        filter: "opacity(0.2)"
      },
      position: "relative",
      height: "100vh",
      width: "100%",
      background: theme.palette.primary.light,
      zIndex: 0
    },
    gettingstarted: {
      position: "relative",
      width: "100%"
    },
    floatRight: {
      float: "right",
      transform: "translateY(-100%)"
    },
    faq: {
      position: "relative",
      height: "100vh",
      width: "100%",
      background: theme.palette.grey["300"]
    },
    footer: {
      position: "relative",
      color: theme.palette.grey["50"],
      background: theme.palette.grey["A700"],
      padding: "50px"
    },
    headingIcon: {
      position: "absolute",
      top: 16,
      right: 16,
      width: 64,
      height: 64,
      marginRight: 16
    }
  });
};

interface Props extends WithStyles<typeof styles> {}

class App extends React.Component<Props, {}> {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar auth={true} />
        <div className={classes.content}>
          <div className={classes.center}>
            <Typography variant="h1" gutterBottom>
              Galgo μτ
            </Typography>
            <br />
            <MascotImage width={256} height={256} />
          </div>
        </div>
        <div className={[classes.about, classes.paddedbox].join(" ")}>
          <Typography variant="h2" gutterBottom>
            Acerca de
          </Typography>
          <InfoIcon className={classes.headingIcon} />
          <Typography variant="h5" gutterBottom>
            Galgo μτ es una aplicación web desarrollada por un estudiante de
            Ingeniería en Sistemas Computacionales que tiene como propósito
            optimizar horarios de estudiantes para el proceso de carga
            académica.
          </Typography>
        </div>
        <div className={[classes.gettingstarted, classes.paddedbox].join(" ")}>
          <Typography variant="h2" gutterBottom>
            Para comenzar a utilizar Galgo μτ se debe de iniciar sesión con las
            credenciales de estudiante del Kardex.
          </Typography>
          <FavoriteIcon className={classes.headingIcon} />
          <br />
          <Button
            variant="contained"
            color="primary"
            className={[classes.button, classes.floatRight].join(" ")}
          >
            Iniciar Sesión
          </Button>
        </div>
        <div className={[classes.faq, classes.paddedbox].join(" ")}>
          <Typography variant="h2" gutterBottom>
            FAQ
          </Typography>
          <HelpIcon className={classes.headingIcon} />
          <List component="nav">
            <ListItem>
              <Typography variant="h4" gutterBottom>
                ¿Por qué se llama Galgo μτ?
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="h5" gutterBottom>
                Galgo μτ hace uso de algoritmos evolutivos para generar
                horarios. En este proceso se generan horarios aleatoreos y se
                mezclan los mejores horarios para generar otros aun mejores.
                Dentro de este proceso ocurren mutaciones a los horarios para
                obtener más variedad de horarios.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="h5" gutterBottom>
                El nombre Galgo μτ es un juego de palabras que usa los símbolos
                griegos μ (mu) y τ (tau) que se pronuncia como Galgo mutau
                (mutado).
              </Typography>
            </ListItem>
          </List>
        </div>
        <div className={[classes.footer, classes.paddedbox].join(" ")}>
          2019© Galgo μτ
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
