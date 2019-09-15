import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import update from "immutability-helper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
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
import useApplicationValidator from "../validation";

function ContainerPanel(props) {
  const { ui, setUi, container, services, volumes, classes } = props;
  const [hasError, clearError] = useApplicationValidator(ui, setUi);

  const servicePorts = services
    .filter(s => s.name === container._serviceName)
    .map(s => s.ports)
    .flat();

  const imagePullPolicies = Object.keys(props.imagePullPolicyNames);

  // unmountedVolumes contains the list of volumes that are not already mounted
  // by this container
  const unmountedVolumes = volumes.filter(v => {
    return (
      container.volumes.findIndex(
        cv => v._type === cv.type && v.name === cv.name
      ) === -1
    );
  });

  const handleChange = event => {
    props.onChange({
      ...container,
      [event.target.name]: event.target.value
    });
    clearError(props.specPath, event.target.name);
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

  const handleVolumeAdd = () => {
    props.onChange({
      ...container,
      volumes: [
        ...container.volumes,
        {
          name: unmountedVolumes[0].name,
          type: unmountedVolumes[0]._type,
          mountPath: "",
          subPath: "",
          readOnly: true
        }
      ]
    });
  };

  const handleVolumeChange = idx => event => {
    const { name, value } = event.target;
    props.onChange(
      update(container, {
        volumes: {
          [idx]: {
            $set: {
              ...container.volumes[idx],
              [name]: value
            }
          }
        }
      })
    );
    clearError(
      props.specPath.concat(["volumes", idx.toString()]),
      event.target.name
    );
  };

  const handleVolumeTypeChange = idx => event => {
    const [_type, name] = event.target.value.split(/-(.+)/);
    props.onChange(
      update(container, {
        volumes: {
          [idx]: {
            $set: {
              ...container.volumes[idx],
              name: name,
              type: _type
            }
          }
        }
      })
    );
  };

  const handleVolumeDelete = idx => () => {
    props.onChange(
      update(container, {
        volumes: { $splice: [[idx, 1]] }
      })
    );
  };

  return (
    <Card className={classNames(classes.card, classes.panel)}>
      <CardContent>
        <Typography variant="overline" align="left" gutterBottom>
          container
        </Typography>
        <Grid container spacing={10}>
          <Grid item xs={6}>
            <div className={classes.container}>
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="type">Service / Component Name</InputLabel>
                <Select
                  value={container._serviceName}
                  required
                  onChange={handleChange}
                  error={hasError(props.specPath, "_serviceName")}
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
                error={hasError(props.specPath, "name")}
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
                error={hasError(props.specPath, "image")}
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
                error={hasError(props.specPath, "imageTag")}
              />
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="type">Image Pull Policy</InputLabel>
                <Select
                  value={container.imagePullPolicy}
                  required
                  onChange={handleChange}
                  error={hasError(props.specPath, "imagePullPolicy")}
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
                error={hasError(props.specPath, "command")}
              />
              <FormControl
                error={hasError(props.specPath, "portNames")}
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
                {hasError(props.specPath, "portNames") && (
                  <FormHelperText>
                    At least one port must be checked.
                  </FormHelperText>
                )}
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={6}>
            {(container.volumes || []).map((vol, volIdx) => (
              <Card
                key={vol.type + "-" + vol.name}
                className={classes.volumeCard}
              >
                <CardContent>
                  <Typography
                    variant="overline"
                    align="left"
                    color="textSecondary"
                    gutterBottom
                  >
                    Volume Mount
                  </Typography>
                  <div className={classes.container}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="type">Volume</InputLabel>
                      <Select
                        value={[vol.type, vol.name].join("-")}
                        onChange={handleVolumeTypeChange(volIdx)}
                        required
                        fullWidth
                        error={hasError(
                          props.specPath.concat(["volumes", volIdx.toString()]),
                          "volume"
                        )}
                        inputProps={{
                          name: "volume",
                          id: "volume"
                        }}
                      >
                        {unmountedVolumes
                          .concat([{ _type: vol.type, name: vol.name }])
                          .map(v => (
                            <MenuItem
                              key={[v._type, v.name].join("-")}
                              value={[v._type, v.name].join("-")}
                            >
                              {v.name} ({v._type})
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                    <TextField
                      name="mountPath"
                      id="mountPath"
                      label="Mount Path"
                      className={classes.textField}
                      value={vol.mountPath}
                      onChange={handleVolumeChange(volIdx)}
                      margin="normal"
                      required
                      error={hasError(
                        props.specPath.concat(["volumes", volIdx.toString()]),
                        "mountPath"
                      )}
                    />
                    <TextField
                      name="subPath"
                      id="subPath"
                      label="Subpath"
                      className={classes.textField}
                      value={vol.subPath}
                      onChange={handleVolumeChange(volIdx)}
                      margin="normal"
                      error={hasError(
                        props.specPath.concat(["volumes", volIdx.toString()]),
                        "subPath"
                      )}
                    />
                    <FormControl
                      error={hasError(props.specPath, "readOnly")}
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="primary"
                              name="readOnly"
                              checked={vol.readOnly === true}
                              onChange={handleVolumeChange(volIdx)}
                              value={vol.readOnly === true}
                            />
                          }
                          label="Read Only?"
                        />
                      </FormGroup>
                    </FormControl>
                  </div>
                </CardContent>
                <CardActions className={classes.actions}>
                  <IconButton
                    className={classes.deleteVolume}
                    aria-label="delete port"
                    onClick={handleVolumeDelete(volIdx)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            ))}
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
        <Button
          variant="contained"
          size="small"
          color="primary"
          disabled={unmountedVolumes.length === 0}
          className={classes.button}
          onClick={handleVolumeAdd}
        >
          Add Volume Mount
          <AddCircleIcon className={classes.rightIcon} />
        </Button>
      </CardActions>
    </Card>
  );
}

ContainerPanel.propTypes = {
  specPath: PropTypes.arrayOf(PropTypes.string).isRequired,
  ui: PropTypes.object.isRequired,
  setUi: PropTypes.func.isRequired,
  container: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  services: PropTypes.arrayOf(PropTypes.object).isRequired,
  volumes: PropTypes.arrayOf(PropTypes.object).isRequired,
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
  },
  volumeCard: {
    minWidth: 275,
    marginTop: 16
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  deleteVolume: {
    marginLeft: "auto"
  }
});

export default withStyles(styles)(ContainerPanel);
