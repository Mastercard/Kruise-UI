import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
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
  delete: {
    marginRight: 'auto',
  },
  card: {
    minWidth: 275,
  },
  panel: {
    marginBottom: theme.spacing.unit * 4,
  },
});

class IngressRulePanel extends Component {
  hasError = field => {
    const appErrors = this.props.validationErrors;
    return appErrors && appErrors.hasOwnProperty(field);
  };

  render() {
    const { ingressRule, services, servicePorts, classes } = this.props;

    return (
      <Card className={classNames(classes.card, classes.panel)}>
        <CardContent>
          <Typography variant="overline" align="left" gutterBottom>
            ingress rule
          </Typography>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <div className={classes.container}>
                <TextField
                  name="host"
                  label="Host Fully Qualified Domain Name (FQDN)"
                  className={classes.textField}
                  value={ingressRule.host}
                  onChange={this.props.onChange(this.props.ingressRuleIndex)}
                  margin="normal"
                  required
                  fullWidth
                  error={this.hasError("host")}
                />
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel htmlFor="type">Service / Component Name</InputLabel>
                  <Select
                    value={ingressRule.serviceName}
                    required
                    onChange={this.props.onChange(this.props.ingressRuleIndex)}
                    error={this.hasError("serviceName")}
                    inputProps={{
                      name: 'serviceName',
                      id: 'serviceName',
                    }}
                  >
                    {services.map((s, idx) =>
                      <MenuItem key={s.name+"-"+idx} value={s.name}>{s.name}</MenuItem>
                    )}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel htmlFor="type">Service / Component Port</InputLabel>
                  <Select
                    value={ingressRule.servicePort}
                    required
                    onChange={this.props.onChange(this.props.ingressRuleIndex)}
                    error={this.hasError("servicePort")}
                    inputProps={{
                      name: 'servicePort',
                      id: 'servicePort',
                    }}
                  >
                    {servicePorts.map((p, idx) =>
                      <MenuItem key={p+"-"+idx} value={p}>{p}</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </div>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="add ingress rule" onClick={this.props.onAdd}>
            <AddCircleIcon />
          </IconButton>
          <IconButton className={classes.delete} aria-label="delete service" onClick={this.props.onDelete}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(IngressRulePanel);
