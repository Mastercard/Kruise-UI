import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import DeleteIcon from "@material-ui/icons/Delete";

function ServicePortPanel(props) {
  const hasError = field => {
    const appErrors = ui.validationErrors;
    return Object.prototype.hasOwnProperty.call(appErrors, field);
  };

  const { servicePort, ui, classes } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          variant="overline"
          align="left"
          color="textSecondary"
          gutterBottom
        >
          Port
        </Typography>
        <div className={classes.container}>
          <TextField
            name="name"
            id="portName"
            label="Name"
            className={classes.textField}
            value={servicePort.name}
            onChange={props.onChange}
            margin="normal"
            error={hasError("name")}
          />
          <TextField
            name="port"
            id="port"
            label="Port"
            type="number"
            className={classes.textField}
            value={servicePort.port}
            onChange={props.onChange}
            margin="normal"
            required
            error={hasError("port")}
          />
          <TextField
            id="targetPort"
            name="targetPort"
            label="Target Port"
            className={classes.textField}
            value={servicePort.targetPort}
            onChange={props.onChange}
            margin="normal"
            error={hasError("targetPort")}
          />
        </div>
      </CardContent>
      <CardActions className={classes.actions}>
        <IconButton
          className={classes.deletePort}
          aria-label="delete port"
          onClick={props.onDelete}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

ServicePortPanel.propTypes = {
  ui: PropTypes.object.isRequired,
  servicePort: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
  card: {
    minWidth: 275,
    marginTop: 16
  },
  firstCard: {
    marginTop: 0
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
    /* width: 400, */
  },
  actions: {
    display: "flex",
    textAlign: "right"
  },
  deletePort: {
    marginLeft: "auto"
  }
});

export default withStyles(styles)(ServicePortPanel);
