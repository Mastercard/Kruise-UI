import React from "react";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";
import { withStyles } from "@material-ui/core/styles";
import update from "immutability-helper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import WizardNav from "./WizardNav";
import VolumePanel from "./VolumePanel";

function Volumes(props) {
  const { app, setApp, ui, classes } = props;

  const volumes = [].concat(
    app.spec.configMaps.map(v => {
      return { _type: "ConfigMap", volume: { ...v } };
    }),
    app.spec.persistentVolumes.map(v => {
      return { _type: "PersistentVolume", volume: { ...v } };
    })
  );

  const typeKey = _type => {
    switch (_type) {
      case "ConfigMap":
        return "configMaps";
      case "PersistentVolume":
        return "persistentVolumes";
      default:
        throw new Error("invalid volume type: " + _type);
    }
  };

  const handleSubmit = event => {
    if (event) event.preventDefault();
    navigate("/volumes");
  };

  const updateApp = updatedVolumes => {
    const { configMaps, persistentVolumes } = updatedVolumes.reduce(
      (vols, vol) => {
        vols[typeKey(vol._type)].push(vol.volume);
        return vols;
      },
      {
        configMaps: [],
        persistentVolumes: []
      }
    );

    setApp({
      ...app,
      spec: {
        ...app.spec,
        configMaps: configMaps,
        persistentVolumes: persistentVolumes
      }
    });
  };

  const handleChange = idx => vol => {
    updateApp(
      update(volumes, {
        [idx]: { $set: vol }
      })
    );
  };

  const handleDelete = idx => () => {
    updateApp(
      update(volumes, {
        $splice: [[idx, 1]]
      })
    );
  };

  const handleAdd = vol => {
    updateApp(
      update(volumes, {
        $push: [vol]
      })
    );
  };

  let view;
  if (volumes.length > 0) {
    view = (
      <VolumesView
        ui={ui}
        volumes={volumes}
        classes={classes}
        onChange={handleChange}
        onAdd={handleAdd}
        onDelete={handleDelete}
      />
    );
  } else {
    view = <NoVolumesView ui={ui} classes={classes} />;
  }

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <div className={classes.root}>{view}</div>
    </form>
  );
}

function VolumesView(props) {
  const { ui, volumes } = props;

  return (
    <Grid container spacing={10}>
      <Grid item xs={10}>
        {volumes.map((volume, volumeIdx) => (
          <VolumePanel
            key={"volume-" + volumeIdx}
            ui={ui}
            volume={volume}
            onAdd={props.onAdd}
            onChange={props.onChange(volumeIdx)}
            onDelete={props.onDelete(volumeIdx)}
          />
        ))}
      </Grid>
      <Grid item xs={2}>
        <WizardNav routes={ui.routes} />
      </Grid>
    </Grid>
  );
}

function NoVolumesView(props) {
  const { ui, classes } = props;
  return (
    <Grid container spacing={10}>
      <Grid item xs={2} />
      <Grid item xs={8}>
        <div className={classes.actionRow}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Add Volume
            <AddCircleIcon className={classes.rightIcon} />
          </Button>
        </div>
      </Grid>
      <Grid item xs={2}>
        <WizardNav routes={ui.routes} />
      </Grid>
    </Grid>
  );
}

Volumes.propTypes = {
  app: PropTypes.object.isRequired,
  setApp: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

VolumesView.propTypes = {
  ui: PropTypes.object.isRequired,
  volumes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAdd: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

NoVolumesView.propTypes = {
  ui: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
  root: {
    display: "flex"
  },
  button: {
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  actionRow: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    textAlign: "center"
  }
});

export default withStyles(styles)(Volumes);
