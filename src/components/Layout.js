import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import { withStyles } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
import Routes from "../routes";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "@reach/router";
import Debug from "./Debug";

function Layout(props) {
  const { classes, app, setApp, services, setServices } = props;

  // const closePreview = event => {
  //   console.log("TODO", "closePreview", event);
  // };

  const showPreview = event => {
    console.log("TODO", "showPreview", event);
  };

  return (
    <div className={classes.root}>
      {/* <ErrorNotifications /> */}
      <AppBar position="absolute" className={classNames(classes.appBar)}>
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            <Link component={RouterLink} to="/" color="inherit">
              Kruise Wizard
            </Link>
          </Typography>
          <IconButton
            color="inherit"
            className={classes.previewButton}
            disabled={true} // TODO: !ui.previewEnabled
            onClick={showPreview}
            aria-label="preview"
          >
            <Visibility />
          </IconButton>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {/* <WizardTabs /> */}
        <div className={classes.tabBarSpacer} />
        <Routes
          app={app}
          setApp={setApp}
          services={services}
          setServices={setServices}
        />
        {/* <PreviewDialog */}
        {/*   content={ui.previewContent} */}
        {/*   open={ui.showPreview} */}
        {/*   onClose={this.closePreview} */}
        {/* /> */}
        <section>
          <Debug app={app} />
        </section>
      </main>
    </div>
  );
}

Layout.propTypes = {
  classes: PropTypes.object,
  app: PropTypes.object,
  setApp: PropTypes.func,
  services: PropTypes.arrayOf(PropTypes.object),
  setServices: PropTypes.func
};

const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  title: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarSpacer: theme.mixins.toolbar,
  tabBarSpacer: {
    minHeight: "12px"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height: "100vh",
    overflow: "auto",
    backgroundColor: grey[200]
  },
  previewButton: {
    marginRight: theme.spacing(1)
  }
});

export default withStyles(styles)(Layout);
