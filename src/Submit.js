import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { nextRoute } from './helpers'
import { goStep } from './actions/index'
import WizardNav from './WizardNav'

const mapStateToProps = state => {
  return {
    application: state.application,
    routes: state.routes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    goStep: path => dispatch(goStep(path)),
  };
}

const styles = theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  repoPath: {
    color: theme.palette.text.secondary,
    fontFamily: 'Monospace',
  },
});

class Submit extends Component {
  handleSubmit = event => {
    event.preventDefault();
    const { goStep, routes, location } = this.props;
    goStep(nextRoute(routes, location));
  };

  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    const { application, routes, classes } = this.props;

    return (
      <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={10}>
              <Paper className={classes.paper}>
                <Typography variant="h2" gutterBottom>
                  Congratulations!
                </Typography>
                <Typography variant="body1">
                  Your application has been created and your <Link href={application.repoURL}>repository</Link> has been updated with your deployment manifests at <span className={classes.repoPath}>{application.path}</span>.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={2}>
              <WizardNav routes={routes} />
            </Grid>
          </Grid>
        </div>
      </form>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Submit));
