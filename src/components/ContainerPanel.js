import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";

function ContainerPanel(props) {
  const { ui, container, services, classes } = props;

  const servicePorts = services
    .filter(s => s.name === container._serviceName)
    .map(s => s.ports)
    .flat();

  const imagePullPolicies = Object.keys(props.imagePullPolicyNames);

  const hasError = field => {
    const appErrors = ui.validationErrors;
    return Object.prototype.hasOwnProperty.call(appErrors, field);
  };

  const handleChange = event => {
    props.onChange({
      ...container,
      [event.target.name]: event.target.value
    });
  };

  const handlePortChange = event => {
    const { name, value } = event.target;

    let newPortNames;
    const containerPorts = container.portNames || [];
    if (containerPorts.indexOf(value) >= 0) {
      // remove it
      newPortNames = containerPorts.filter(p => p !== value);
    } else {
      // add it
      newPortNames = [...containerPorts, value];
    }

    props.onChange({
      ...container,
      [name]: newPortNames
    });
  };

  return (
    <Card className={classNames(classes.card, classes.panel)}>
      <CardContent>
        <Typography variant="overline" align="left" gutterBottom>
          container
        </Typography>
        <Grid container spacing={10}>
          <Grid item xs={12}>
            <div className={classes.container}>
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="type">Service / Component Name</InputLabel>
                <Select
                  value={container._serviceName}
                  required
                  onChange={handleChange}
                  error={hasError("_serviceName")}
                  inputProps={{
                    name: "_serviceName",
                    id: "_serviceName"
                  }}
                >
                  {services.map(s => (
                    <MenuItem key={s.name} value={s.name}>
                      {s.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                name="name"
                label="Container name"
                className={classes.textField}
                value={container.name}
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                error={hasError("name")}
              />
              <TextField
                name="image"
                label="Image Location"
                className={classes.textField}
                value={container.image}
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                error={hasError("image")}
              />
              <TextField
                name="imageTag"
                label="Image Version"
                className={classes.textField}
                value={container.imageTag}
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                error={hasError("imageTag")}
              />
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="type">Image Pull Policy</InputLabel>
                <Select
                  value={container.imagePullPolicy}
                  required
                  onChange={handleChange}
                  error={hasError("imagePullPolicy")}
                  inputProps={{
                    name: "imagePullPolicy",
                    id: "imagePullPolicy"
                  }}
                >
                  {imagePullPolicies.map(p => (
                    <MenuItem key={p} value={p}>
                      {props.imagePullPolicyNames[p]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                name="command"
                label="Command"
                className={classes.textField}
                value={container.command}
                onChange={handleChange}
                margin="normal"
                fullWidth
                error={hasError("command")}
              />
              <FormControl
                error={hasError("portNames")}
                component="fieldset"
                className={classes.formControl}
              >
                <FormLabel component="legend">Ports</FormLabel>
                <FormGroup row>
                  {servicePorts.map((p, idx) => (
                    <FormControlLabel
                      key={p.name + "-" + idx}
                      control={
                        <Checkbox
                          color="primary"
                          name="portNames"
                          checked={container.portNames.indexOf(p.name) >= 0}
                          onChange={handlePortChange}
                          value={p.name}
                        />
                      }
                      label={p.name}
                    />
                  ))}
                </FormGroup>
                {hasError("portNames") && (
                  <FormHelperText>
                    At least one port must be checked.
                  </FormHelperText>
                )}
              </FormControl>
            </div>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions className={classes.actions}>
        <IconButton aria-label="add container" onClick={props.onAdd}>
          <AddCircleIcon />
        </IconButton>
        <IconButton
          className={classes.delete}
          aria-label="delete container"
          onClick={props.onDelete}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

ContainerPanel.propTypes = {
  ui: PropTypes.object.isRequired,
  container: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  services: PropTypes.arrayOf(PropTypes.object).isRequired,
  imagePullPolicyNames: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
    /* width: 400, */
  },
  formControl: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(2),
    minWidth: 400,
    textAlign: "left"
  },
  actions: {
    display: "flex",
    textAlign: "right"
  },
  delete: {
    marginRight: "auto"
  },
  card: {
    minWidth: 275
  },
  panel: {
    marginBottom: theme.spacing(4)
  }
});

export default withStyles(styles)(ContainerPanel);
