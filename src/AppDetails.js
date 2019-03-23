import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

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
});

const envs = ["Dev", "Stage", "Prod"];
const regions = ["STL", "KCI", "BEL"];

class AppDetails extends Component {
  state = {
    appName: 'molly-data',
    release: 'v1',
    tenant: 'molly',
    environment: 'Dev',
    region: 'STL',
    namespace: 'molly',
    repoURL: 'github.com/ryane/molly-data',
    path: '/',
    targetRevision: "HEAD",
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id="application-name"
                  label="Application Name"
                  className={classes.textField}
                  value={this.state.appName}
                  onChange={this.handleChange('appName')}
                  margin="normal"
                />
                <TextField
                  id="release"
                  label="Release / Version"
                  className={classes.textField}
                  value={this.state.release}
                  onChange={this.handleChange('release')}
                  margin="normal"
                />
                <TextField
                  id="tenant"
                  label="Team Organization"
                  className={classes.textField}
                  value={this.state.tenant}
                  onChange={this.handleChange('tenant')}
                  margin="normal"
                />
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="environment">TargetEnvironment</InputLabel>
                  <Select
                    value={this.state.environment}
                    onChange={this.handleChange('environment')}
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
                    onChange={this.handleChange('region')}
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
                  id="namespace"
                  label="Target Namespace"
                  className={classes.textField}
                  value={this.state.namespace}
                  onChange={this.handleChange('namespace')}
                  margin="normal"
                />
              </form>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id="repoURL"
                  label="Deployment Git Repo URL"
                  className={classes.textField}
                  value={this.state.repoURL}
                  onChange={this.handleChange('repoURL')}
                  margin="normal"
                />
                <TextField
                  id="path"
                  label="Deployment Git Path"
                  className={classes.textField}
                  value={this.state.path}
                  onChange={this.handleChange('path')}
                  margin="normal"
                />
                <TextField
                  id="targetRevision"
                  label="Deployment Git Revision"
                  className={classes.textField}
                  value={this.state.targetRevision}
                  onChange={this.handleChange('targetRevision')}
                  margin="normal"
                />
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(AppDetails);
