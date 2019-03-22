import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import WizardTabs from './WizardTabs';

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
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
});

class Layout extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
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
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(Layout);
