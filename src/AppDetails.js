import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setName } from './actions/index'

const mapStateToProps = state => {
  return { application: state.application };
};

const mapDispatchToProps = dispatch => {
  return {
    setName: e => dispatch(setName(e.target.value))
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
const next = "/service";

class AppDetails extends Component {
  /* state = {
   *   appName: 'molly-data',
   *   release: 'v1',
   *   tenant: 'molly',
   *   environment: 'Dev',
   *   region: 'STL',
   *   namespace: 'molly',
   *   repoURL: 'github.com/ryane/molly-data',
   *   path: '/',
   *   targetRevision: "HEAD",
   * };
   */

  state = {
    name: '',
    release: '',
    tenant: '',
    environment: 'Dev',
    region: 'STL',
    namespace: '',
    repoURL: '',
    path: '',
    targetRevision: "HEAD",
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={5}>
            <Paper className={classes.paper}>
              <form className={classes.container} noValidate autoComplete="off">
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
              </form>
            </Paper>
          </Grid>
          <Grid item xs={5}>
            <Paper className={classes.paper}>
              <form className={classes.container} noValidate autoComplete="off">
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
              </form>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Button
              disabled={true}
              className={classes.button}
            >
              Back
            </Button>
            <Button
              size="large"
              variant="contained"
              color="primary"
              className={classes.button}
              fullWidth={false}
              component={Link}
              to={next}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AppDetails));
