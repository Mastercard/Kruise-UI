import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import WizardNav from './WizardNav'
import { nextRoute } from './helpers'
import { goStep } from './actions/index'

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
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    /* width: 400, */
  },
  formControl: {
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2,
    minWidth: 400,
    textAlign: 'left',
  },
  actions: {
    display: 'flex',
    textAlign: 'right',
  },
  deletePort: {
    marginLeft: 'auto',
  },
  actionRow: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: 'center',
  },
  card: {
    minWidth: 275,
  },
});

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

const serviceTypes = ["ClusterIP", "ExternalName", "LoadBalancer"];

class Service extends Component {
  handleSubmit = event => {
    event.preventDefault();
    const { goStep, routes, location } = this.props;
    goStep(nextRoute(routes, location));
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
            <Grid item xs={10}>
              <Paper className={classes.paper}>
                <Typography variant="overline" align="left" gutterBottom>
                  service
                </Typography>
                <Grid container spacing={24}>
                  <Grid item xs={6}>
                    <div className={classes.container}>
                      <TextField
                        name="name"
                        label="Service / Component Name"
                        className={classes.textField}
                        value="heyo"
                        margin="normal"
                        required
                        fullWidth
                      />
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="environment">TargetEnvironment</InputLabel>
                        <Select
                          value="ClusterIP"
                          required
                          onChange={this.handleChange}
                          fullWidth
                          inputProps={{
                            name: 'environment',
                            id: 'environment',
                          }}
                        >
                          {serviceTypes.map((s) =>
                            <MenuItem key={s} value={s}>{s}</MenuItem>
                          )}
                        </Select>
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <Card className={classes.card}>
                      <CardContent>
                        <Typography variant="overline" align="left" color="textSecondary" gutterBottom>
                          Port
                        </Typography>
                        <div className={classes.container}>
                          <TextField
                            name="name"
                            label="Name"
                            className={classes.textField}
                            value="http"
                            margin="normal"
                            required
                            fullWidth
                          />
                          <TextField
                            name="port"
                            label="Port"
                            className={classes.textField}
                            value="80"
                            margin="normal"
                            required
                            fullWidth
                          />
                          <TextField
                            name="targetPort"
                            label="Target Port"
                            className={classes.textField}
                            value=""
                            margin="normal"
                            fullWidth
                          />
                        </div>
                      </CardContent>
                      <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton className={classes.deletePort} aria-label="delete port">
                          <DeleteIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                    <div className={classes.actionRow}>
                      <Button variant="contained" size="small" color="primary" className={classes.button}>
                        Add Port
                        <Icon className={classes.rightIcon}>add_circle</Icon>
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={2}>
              <WizardNav routes={routes} goStep={this.props.goStep} />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.actionRow}>
                <Button variant="contained" color="primary" className={classes.button}>
                  Add Service
                  <Icon className={classes.rightIcon}>add_circle</Icon>
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </form>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Service));
