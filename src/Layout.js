import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withRouter, Route, Redirect, Switch } from "react-router-dom";
import grey from '@material-ui/core/colors/grey';
import WizardTabs from './WizardTabs';
import ErrorNotifications from './ErrorNotification';

const contentBackgroundColor = grey[200];

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarSpacer: theme.mixins.toolbar,
  tabBarSpacer: {
    minHeight: '12px',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
    backgroundColor: contentBackgroundColor,
  },
});

const mapStateToProps = state => {
  return {
    ui: state.ui,
    routes: state.routes,
  };
};

class Layout extends Component {
  render() {
    const { ui, classes, routes, location } = this.props;

    if (ui.step !== "" && ui.step !== location.pathname) {
      return <Redirect to={ui.step} />;
    }

    return (
      <div className={classes.root}>
        <ErrorNotifications />
        <AppBar position="absolute" className={classNames(classes.appBar)}>
          <Toolbar className={classes.toolbar}>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Kruise Application Deployment Wizard
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <WizardTabs />
          <div className={classes.tabBarSpacer} />
          <Switch>
            {routes.map((r) =>
              <Route exact key={r.path} path={r.path} component={r.component} />
            )}
          </Switch>
        </main>
      </div>
    )
  }
}

export default connect(mapStateToProps)(withRouter(withStyles(styles)(Layout)));
