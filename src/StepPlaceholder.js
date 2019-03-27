import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import WizardNav from './WizardNav'
import { nextRoute } from './helpers'
import { goStep } from './actions/index'

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
});

class StepPlaceholder extends Component {
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
    const { routes, location, classes } = this.props;

    return (
      <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={10}>
              <Paper className={classes.paper}>
                <Typography component="h1" variant="h2" color="inherit" noWrap className={classes.title}>
                  { location.pathname }
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={2}>
              <WizardNav routes={routes} goStep={this.props.goStep} />
            </Grid>
          </Grid>
        </div>
      </form>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StepPlaceholder));
