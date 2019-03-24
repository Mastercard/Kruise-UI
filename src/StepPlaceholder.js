import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import WizardNav from './WizardNav'
import { goToNext } from './helpers'

const mapStateToProps = state => {
  return {
    application: state.application,
    routes: state.routes,
  };
};

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

    goToNext(this.props.routes, this.props.location, this.props.history);
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
              <WizardNav routes={routes} />
            </Grid>
          </Grid>
        </div>
      </form>
    )
  }
}

export default connect(mapStateToProps)(withStyles(styles)(StepPlaceholder));
