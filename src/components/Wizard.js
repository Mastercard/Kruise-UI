import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import { withStyles } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
import Routes from "../routes";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "@reach/router";
import Debug from "./Debug";
import PreviewDialog from "./PreviewDialog";
import ErrorNotifications from "./ErrorNotifications";
import WizardTabs from "./WizardTabs";
import { loadStore, saveStore } from "../store";

function Wizard(props) {
  const store = loadStore();
  const [app, setApp] = useState(store.application);
  const [ui, setUi] = useState(store.ui);
  const { classes } = props;

  const showPreview = on => {
    setUi({
      ...ui,
      showPreview: on === true
    });
  };

  const setError = error => {
    setUi({
      ...ui,
      error: error
    });
  };

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    saveStore(app);
  }, [app]);

  return (
    <div className={classes.root}>
      <ErrorNotifications error={ui.error} dismiss={clearError} />
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
            disabled={!ui.previewEnabled}
            onClick={() => showPreview(true)}
            aria-label="preview"
          >
            <Visibility />
          </IconButton>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <WizardTabs routes={ui.routes} />
        <div className={classes.tabBarSpacer} />
        <Routes ui={ui} setUi={setUi} app={app} setApp={setApp} />
        <PreviewDialog
          content={ui.previewContent}
          open={ui.showPreview}
          onClose={() => showPreview(false)}
        />
        {window.KruiseConfig.Debug && (
          <section>
            <Button color="primary" onClick={() => setError("testing 1 2 3")}>
              Error
            </Button>
            <Button color="primary" onClick={() => showPreview(true)}>
              Preview
            </Button>
            <Debug app={app} />
          </section>
        )}
      </main>
    </div>
  );
}

Wizard.propTypes = {
  classes: PropTypes.object.isRequired
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

export default withStyles(styles)(Wizard);
