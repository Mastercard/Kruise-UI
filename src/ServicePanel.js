import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import DeleteIcon from '@material-ui/icons/Delete';
import ServicePortPanel from './ServicePortPanel'

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
  deleteService: {
    marginRight: 'auto',
  },
  actionRow: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: 'center',
  },
  card: {
    minWidth: 275,
  },
  panel: {
    marginBottom: theme.spacing.unit * 4,
  },
});

const serviceTypes = ["ClusterIP", "ExternalName", "LoadBalancer"];

class ServicePanel extends Component {
  hasError = field => {
    const appErrors = this.props.validationErrors;
    return appErrors.hasOwnProperty(field);
  };

  render() {
    const { service, validationErrors, classes } = this.props;

    let portValidationErrors = {};
    if (validationErrors.ports)
      portValidationErrors = validationErrors.ports;

    return (
      <Card className={classNames(classes.card, classes.panel)}>
        <CardContent>
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
                  value={service.name}
                  onChange={this.props.onChange("service", this.props.serviceIndex)}
                  margin="normal"
                  required
                  fullWidth
                  error={this.hasError("name")}
                />
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="type">Service Type</InputLabel>
                  <Select
                    value={service.type}
                    required
                    onChange={this.props.onChange("service", this.props.serviceIndex)}
                    fullWidth
                    error={this.hasError("type")}
                    inputProps={{
                      name: 'type',
                      id: 'type',
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
              {service.ports.map((port, idx) =>
                <ServicePortPanel
                  key={"service-port-"+idx}
                  servicePortIndex={idx}
                  servicePort={port}
                  onChange={this.props.onChange("port", this.props.serviceIndex, idx)}
                  onDelete={this.props.deleteServicePort(this.props.serviceIndex, idx)}
                  validationErrors={portValidationErrors[idx] || {}}
                />
              )}
              <div className={classes.actionRow}>
                <Button variant="contained" size="small" color="primary" className={classes.button} onClick={this.props.addServicePort}>
                  Add Port
                  <Icon className={classes.rightIcon}>add_circle</Icon>
                </Button>
              </div>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton className={classes.deleteService} aria-label="delete service" onClick={this.props.onDelete}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(ServicePanel);
