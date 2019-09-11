import React from "react";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";
import { withStyles } from "@material-ui/core/styles";
import update from "immutability-helper";
import Grid from "@material-ui/core/Grid";
import WizardNav from "./WizardNav";
import VolumePanel from "./VolumePanel";
import EmptyResourceView from "./EmptyResourceView";

const volumeTypes = ["PersistentVolume", "ConfigMap"];
const accessModes = ["ReadWriteOnce", "ReadOnlyMany", "ReadWriteMany"];
const storageClasses = ["SSD", "NFS"];

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

  const newVolume = _type => {
    switch (_type) {
      case "ConfigMap":
        return { name: "", data: "" };
      case "PersistentVolume":
        return {
          name: "",
          accessMode: accessModes[0],
          capacity: 20,
          storageClassName: storageClasses[0]
        };
      default:
        throw new Error("invalid volume type: " + _type);
    }
  };

  const handleSubmit = event => {
    if (event) event.preventDefault();
    navigate("/volumes");
  };

  const updateApp = command => {
    const updatedVolumes = update(volumes, command);
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
    updateApp({ [idx]: { $set: vol } });
  };

  const handleDelete = idx => () => {
    updateApp({ $splice: [[idx, 1]] });
  };

  const handleAdd = () => {
    const newType = volumeTypes[0];
    updateApp({ $push: [{ _type: newType, volume: newVolume(newType) }] });
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
        volumeCreator={newVolume}
      />
    );
  } else {
    view = <EmptyResourceView ui={ui} name="Volume" onAdd={handleAdd} />;
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
            volumeCreator={props.volumeCreator}
            volumeTypes={volumeTypes}
            accessModes={accessModes}
            storageClasses={storageClasses}
          />
        ))}
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
  volumeCreator: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

const styles = {
  root: {
    display: "flex"
  }
};

export default withStyles(styles)(Volumes);
