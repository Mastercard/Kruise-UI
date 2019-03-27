import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';
import { submitApp } from './actions/index'
import { withRouter } from 'react-router-dom';
import WizardNav from './WizardNav'

const mapStateToProps = state => {
  return {
    application: state.application,
    routes: state.routes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitApp: payload => dispatch(submitApp(payload)),
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
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
  },
  formControl: {
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2,
    minWidth: 400,
    textAlign: 'left',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
});

const envs = ["Dev", "Stage", "Prod"];
const regions = ["STL", "KCI", "BEL"];

class AppDetails extends Component {
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.submitApp(this.state);
  };

  constructor(props) {
    super(props);

    // initialize local state from application
    this.state = Object.assign({}, props.application);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    const { routes, classes } = this.props;

    return (
      <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={5}>
              <Paper className={classes.paper}>
                <Typography variant="overline" align="left" gutterBottom>
                  application details
                </Typography>
                <div className={classes.container}>
                  <TextField
                    name="name"
                    label="Application Name"
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.handleChange}
                    margin="normal"
                  />
                  <TextField
                    name="release"
                    label="Release / Version"
                    className={classes.textField}
                    value={this.state.release}
                    onChange={this.handleChange}
                    margin="normal"
                  />
                  <TextField
                    name="tenant"
                    label="Team Organization"
                    className={classes.textField}
                    value={this.state.tenant}
                    onChange={this.handleChange}
                    margin="normal"
                  />
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="environment">TargetEnvironment</InputLabel>
                    <Select
                      value={this.state.environment}
                      onChange={this.handleChange}
                      inputProps={{
                        name: 'environment',
                        id: 'environment',
                      }}
                    >
                      {envs.map((e) =>
                        <MenuItem key={e} value={e}>{e}</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="environment">Target Region</InputLabel>
                    <Select
                      value={this.state.region}
                      onChange={this.handleChange}
                      inputProps={{
                        name: 'region',
                        id: 'region',
                      }}
                    >
                      {regions.map((e) =>
                        <MenuItem key={e} value={e}>{e}</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                  <TextField
                    name="namespace"
                    label="Target Namespace"
                    className={classes.textField}
                    value={this.state.namespace}
                    onChange={this.handleChange}
                    margin="normal"
                  />
                </div>
              </Paper>
            </Grid>
            <Grid item xs={5}>
              <Paper className={classes.paper}>
                <Typography variant="overline" align="left" gutterBottom>
                  repository settings
                </Typography>
                <div className={classes.container}>
                  <TextField
                    name="repoURL"
                    label="Deployment Git Repo URL"
                    className={classes.textField}
                    value={this.state.repoURL}
                    onChange={this.handleChange}
                    margin="normal"
                  />
                  <TextField
                    name="path"
                    label="Deployment Git Path"
                    className={classes.textField}
                    value={this.state.path}
                    onChange={this.handleChange}
                    margin="normal"
                  />
                  <TextField
                    name="targetRevision"
                    label="Deployment Git Revision"
                    className={classes.textField}
                    value={this.state.targetRevision}
                    onChange={this.handleChange}
                    margin="normal"
                  />
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(AppDetails)));
