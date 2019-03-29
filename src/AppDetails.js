import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { submitApp, clearValidationError, canPreview } from './actions/index'
import { withRouter } from 'react-router-dom';
import WizardNav from './WizardNav'

const mapStateToProps = state => {
  return {
    application: state.application,
    ui: state.ui,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitApp: payload => dispatch(submitApp(payload)),
    clearValidationError: field => dispatch(clearValidationError(field)),
    canPreview: show => dispatch(canPreview(show)),
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
    if (this.hasError(event.target.name)) {
      this.props.clearValidationError(event.target.name);
    }
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.submitApp(this.state);
  };

  hasError = field => {
    const appErrors = this.props.ui.validationErrors;
    return appErrors.hasOwnProperty(field);
  };

  constructor(props) {
    super(props);

    // initialize local state from application
    this.state = Object.assign({}, props.application);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.canPreview(this.state);
  }

  render() {
    const { classes } = this.props;

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
                    required
                    error={this.hasError("name")}
                  />
                  <TextField
                    name="release"
                    label="Release / Version"
                    className={classes.textField}
                    value={this.state.release}
                    onChange={this.handleChange}
                    margin="normal"
                    required
                    error={this.hasError("release")}
                  />
                  <TextField
                    name="tenant"
                    label="Team Organization"
                    className={classes.textField}
                    value={this.state.tenant}
                    onChange={this.handleChange}
                    margin="normal"
                    required
                    error={this.hasError("tenant")}
                  />
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="environment">Target Environment</InputLabel>
                    <Select
                      value={this.state.environment}
                      required
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
                      required
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
                    required
                    error={this.hasError("namespace")}
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
                  {/* TODO: validate that this is a url (the server does currently) */}
                  <TextField
                    name="repoURL"
                    label="Deployment Git Repo URL"
                    className={classes.textField}
                    value={this.state.repoURL}
                    onChange={this.handleChange}
                    margin="normal"
                    required
                    error={this.hasError("repoURL")}
                  />
                  <TextField
                    name="path"
                    label="Deployment Git Path"
                    className={classes.textField}
                    value={this.state.path}
                    onChange={this.handleChange}
                    margin="normal"
                    required
                    error={this.hasError("path")}
                  />
                  <TextField
                    name="targetRevision"
                    label="Deployment Git Revision"
                    className={classes.textField}
                    value={this.state.targetRevision}
                    onChange={this.handleChange}
                    margin="normal"
                    required
                    error={this.hasError("targetRevision")}
                  />
                </div>
              </Paper>
            </Grid>
            <Grid item xs={2}>
              <WizardNav />
            </Grid>
          </Grid>
        </div>
      </form>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(AppDetails)));
