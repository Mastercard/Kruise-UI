import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  card: {
    minWidth: 275,
    marginTop: 16,
  },
  firstCard: {
    marginTop: 0,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    /* width: 400, */
  },
  actions: {
    display: 'flex',
    textAlign: 'right',
  },
  deletePort: {
    marginLeft: 'auto',
  },
});

class ServicePortPanel extends Component {
  hasError = field => {
    const appErrors = this.props.validationErrors;
    return appErrors.hasOwnProperty(field);
  };

  render() {
    const { servicePort, classes } = this.props;
    return (
      <Card className={this.props.servicePortIndex === 0 ? classes.firstCard : classes.card}>
        <CardContent>
          <Typography variant="overline" align="left" color="textSecondary" gutterBottom>
            Port
          </Typography>
          <div className={classes.container}>
            <TextField
              name="name"
              id="portName"
              label="Name"
              className={classes.textField}
              value={servicePort.name}
              onChange={this.props.onChange}
              margin="normal"
              fullWidth
              error={this.hasError("name")}
            />
            <TextField
              name="port"
              id="port"
              label="Port"
              type="number"
              className={classes.textField}
              value={servicePort.port}
              onChange={this.props.onChange}
              margin="normal"
              required
              fullWidth
              error={this.hasError("port")}
            />
            <TextField
              id="targetPort"
              name="targetPort"
              label="Target Port"
              className={classes.textField}
              value={servicePort.targetPort}
              onChange={this.props.onChange}
              margin="normal"
              fullWidth
              error={this.hasError("targetPort")}
            />
          </div>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton className={classes.deletePort} aria-label="delete port">
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(ServicePortPanel);
