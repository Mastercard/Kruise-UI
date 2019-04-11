import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';

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

const imagePullPolicyNames = {
  "Always": "Always",
  "IfNotPresent": "If not present",
};

class ContainerPanel extends Component {
  hasError = field => {
    const appErrors = this.props.validationErrors;
    return appErrors && appErrors.hasOwnProperty(field);
  };

  render() {
    const { container, services, classes } = this.props;

    return (
      <Card className={classNames(classes.card, classes.panel)}>
        <CardContent>
          <Typography variant="overline" align="left" gutterBottom>
            container
          </Typography>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <div className={classes.container}>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel htmlFor="type">Service / Component Name</InputLabel>
                  <Select
                    value={container.serviceName}
                    required
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
                <TextField
                  name="name"
                  label="Container name"
                  className={classes.textField}
                  value={container.name}
                  margin="normal"
                  required
                  fullWidth
                  error={this.hasError("name")}
                />
                <TextField
                  name="image"
                  label="Image Location"
                  className={classes.textField}
                  value={container.image}
                  margin="normal"
                  required
                  fullWidth
                  error={this.hasError("image")}
                />
                <TextField
                  name="imageTag"
                  label="Image Version"
                  className={classes.textField}
                  value={container.imageTag}
                  margin="normal"
                  required
                  fullWidth
                  error={this.hasError("imageTag")}
                />
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel htmlFor="type">Image Pull Policy</InputLabel>
                  <Select
                    value={container.imagePullPolicy}
                    required
                    error={this.hasError("imagePullPolicy")}
                    inputProps={{
                      name: 'imagePullPolicy',
                      id: 'imagePullPolicy',
                    }}
                  >
                    {this.props.imagePullPolicies.map((p, idx) =>
                      <MenuItem key={p} value={p}>{imagePullPolicyNames[p]}</MenuItem>
                    )}
                  </Select>
                </FormControl>
                <TextField
                  name="command"
                  label="Command"
                  className={classes.textField}
                  value={container.command}
                  margin="normal"
                  fullWidth
                  error={this.hasError("command")}
                />
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
  };
};

export default withStyles(styles)(ContainerPanel);
