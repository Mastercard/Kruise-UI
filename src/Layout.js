import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import { withRouter, Route, Redirect, Switch } from "react-router-dom";
import grey from '@material-ui/core/colors/grey';
import { togglePreview } from './actions/index'
import WizardTabs from './WizardTabs';
import PreviewDialog from './PreviewDialog'
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
  previewButton: {
    marginRight: theme.spacing.unit,
  },
});

const mapStateToProps = state => {
  return {
    ui: state.ui,
    routes: state.routes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    togglePreview: show => dispatch(togglePreview(show)),
  };
};

class Layout extends Component {
  closePreview = event => {
    this.props.togglePreview(false);
  };

  showPreview = event => {
    this.props.togglePreview(true);
  };

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
            <IconButton color="inherit" className={classes.previewButton} disabled={!ui.previewEnabled} onClick={this.showPreview} aria-label="preview">
              <Visibility />
            </IconButton>
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
          <PreviewDialog open={ui.showPreview} onClose={this.closePreview} />
        </main>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Layout)));
