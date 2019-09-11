import React, { useState } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

function VolumePanel(props) {
  const { ui, volume, volumeTypes, classes } = props;

  const [typeMap, setTypeMap] = useState({});

  const hasError = field => {
    const appErrors = ui.validationErrors;
    return Object.prototype.hasOwnProperty.call(appErrors, field);
  };

  const handleChange = event => {
    props.onChange({
      ...volume,
      volume: {
        ...volume.volume,
        [event.target.name]: event.target.value
      }
    });
  };

  const handleTypeChange = event => {
    const currentType = volume._type;
    const newType = event.target.value;

    // cache old type values
    setTypeMap({ ...typeMap, [currentType]: volume.volume });

    // create a new default volume
    let newVolume = props.volumeCreator(newType);

    // if there is a cached volume of newType, update the fields in the new
    // volume
    const cachedType = typeMap[newType];
    if (cachedType) {
      Object.keys(cachedType)
        .filter(k => k in newVolume)
        .forEach(k => {
          newVolume[k] = cachedType[k];
        });
    }

    // update volume
    props.onChange({
      _type: newType,
      volume: newVolume
    });
  };

  return (
    <Card className={classNames(classes.card, classes.panel)}>
      <CardContent>
        <Typography variant="overline" align="left" gutterBottom>
          volume
        </Typography>
        <Grid container spacing={10}>
          <Grid item xs={6}>
            <div className={classes.container}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="type">Volume Type</InputLabel>
                <Select
                  value={volume._type}
                  onChange={handleTypeChange}
                  required
                  fullWidth
                  error={hasError("_type")}
                  inputProps={{
                    name: "_type",
                    id: "_type"
                  }}
                >
                  {volumeTypes.map(s => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                name="name"
                label="Volume / Component Name"
                className={classes.textField}
                value={volume.volume.name}
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                error={hasError("name")}
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            {(() => {
              switch (volume._type) {
                case "ConfigMap":
                  return (
                    <ConfigMap
                      volume={volume.volume}
                      onChange={handleChange}
                      hasError={hasError}
                      classes={classes}
                    />
                  );
                case "PersistentVolume":
                  return (
                    <PersistentVolume
                      volume={volume.volume}
                      onChange={handleChange}
                      hasError={hasError}
                      accessModes={props.accessModes}
                      storageClasses={props.storageClasses}
                      classes={classes}
                    />
                  );
                default:
                  return null;
              }
            })()}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions className={classes.actions}>
        <IconButton
          className={classes.addVolume}
          aria-label="add volume"
          onClick={props.onAdd}
        >
          <AddCircleIcon />
        </IconButton>
        <IconButton
          className={classes.deleteVolume}
          aria-label="delete volume"
          onClick={props.onDelete}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

function ConfigMap(props) {
  const { volume, classes } = props;
  return (
    <div className={classes.container}>
      <TextField
        name="data"
        label="Content"
        className={classes.textField}
        value={volume.data}
        onChange={props.onChange}
        margin="normal"
        required
        fullWidth
        multiline
        rows="4"
        variant="outlined"
        error={props.hasError("data")}
      />
    </div>
  );
}

function PersistentVolume(props) {
  const { volume, classes } = props;
  return (
    <div className={classes.container}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="accessMode">Access Type</InputLabel>
        <Select
          value={volume.accessMode}
          onChange={props.onChange}
          required
          fullWidth
          error={props.hasError("accessMode")}
          inputProps={{
            name: "accessMode",
            id: "accessMode"
          }}
        >
          {props.accessModes.map(s => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        name="capacity"
        label="Size (in GB)"
        type="number"
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
        value={volume.capacity}
        onChange={props.onChange}
        margin="normal"
        required
        error={props.hasError("capacity")}
      />
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="storageClassName">Storage Class</InputLabel>
        <Select
          value={volume.storageClassName}
          onChange={props.onChange}
          required
          fullWidth
          error={props.hasError("storageClassName")}
          inputProps={{
            name: "storageClassName",
            id: "storageClassName"
          }}
        >
          {props.storageClasses.map(s => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

VolumePanel.propTypes = {
  ui: PropTypes.object.isRequired,
  volume: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  volumeCreator: PropTypes.func.isRequired,
  volumeTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  storageClasses: PropTypes.arrayOf(PropTypes.string).isRequired,
  accessModes: PropTypes.arrayOf(PropTypes.string).isRequired,
  classes: PropTypes.object.isRequired
};

ConfigMap.propTypes = {
  volume: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  hasError: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

PersistentVolume.propTypes = {
  volume: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  hasError: PropTypes.func.isRequired,
  storageClasses: PropTypes.arrayOf(PropTypes.string).isRequired,
  accessModes: PropTypes.arrayOf(PropTypes.string).isRequired,
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
  root: {
    display: "flex"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  button: {
    marginRight: theme.spacing(1)
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
  deletePort: {
    marginLeft: "auto"
  },
  deleteVolume: {
    marginRight: "auto"
  },
  card: {
    minWidth: 275
  },
  panel: {
    marginBottom: theme.spacing(4)
  }
});

export default withStyles(styles)(VolumePanel);
