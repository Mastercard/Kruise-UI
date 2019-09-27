import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import update from "immutability-helper";
import Grid from "@material-ui/core/Grid";
import WizardNav from "./WizardNav";
import VolumePanel from "./VolumePanel";
import EmptyResourceView from "./EmptyResourceView";
import useApplicationValidator from "../validation";

const volumeTypes = ["PersistentVolume", "ConfigMap"];
const accessModes = ["ReadWriteOnce", "ReadOnlyMany", "ReadWriteMany"];
const storageClasses = window.KruiseConfig.StorageClasses;

function Volumes(props) {
  const { app, setApp, ui, setUi, classes } = props;
  const [, , validate] = useApplicationValidator(ui, setUi);

  const [volumes, setVolumes] = useState(
    [].concat(
      app.spec.configMaps.map((v, i) => {
        return { _type: "ConfigMap", _index: i.toString(), volume: { ...v } };
      }),
      app.spec.persistentVolumes.map((v, i) => {
        return {
          _type: "PersistentVolume",
          _index: i.toString(),
          volume: { ...v }
        };
      })
    )
  );

  // attachedVolumes builds a map of volume mounts for all containers. we need
  // this so that we can update the name and types on containers' volume
  // mounts
  const [attachedVolumes, setAttachedVolumes] = useState(
    (app.spec.components || []).reduce((compacc, component, componentIdx) => {
      (component.containers || []).forEach((container, containerIdx) => {
        (container.volumes || []).forEach((volMount, volMountIdx) => {
          volumes.forEach((vol, volIdx) => {
            if (
              volMount.name === vol.volume.name &&
              volMount.type === vol._type
            ) {
              compacc.push({
                componentIdx: componentIdx,
                containerIdx: containerIdx,
                volumeMountIdx: volMountIdx,
                volumeIdx: volIdx,
                volume: vol
              });
            }
          });
        });
      });
      return compacc;
    }, [])
  );

  // lookup the right json key name for different volume types
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

  // factory to create new volumes
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

  const handleSubmit = () => {
    return validate(updateApp());
  };

  // updateApp runs when the form is submitted, updates the application state,
  // and returns the app
  const updateApp = () => {
    // reduce volumes into an object grouped by volume type
    const { configMaps, persistentVolumes } = volumes.reduce(
      (vols, vol) => {
        vols[typeKey(vol._type)].push(vol.volume);
        return vols;
      },
      {
        configMaps: [],
        persistentVolumes: []
      }
    );

    // fix up any volume mounts in containers
    let newComponents = app.spec.components;
    attachedVolumes.forEach(av => {
      newComponents = update(newComponents, {
        [av.componentIdx]: {
          containers: {
            [av.containerIdx]: {
              volumes: {
                [av.volumeMountIdx]: {
                  $merge: {
                    name: volumes[av.volumeIdx].volume.name,
                    type: volumes[av.volumeIdx]._type
                  }
                }
              }
            }
          }
        }
      });
    });

    const newApp = {
      ...app,
      spec: {
        ...app.spec,
        components: newComponents,
        configMaps: configMaps,
        persistentVolumes: persistentVolumes
      }
    };
    setApp(newApp);
    return newApp;
  };

  const handleChange = idx => vol => {
    setVolumes(update(volumes, { [idx]: { $set: vol } }));
  };

  const handleDelete = idx => () => {
    setVolumes(update(volumes, { $splice: [[idx, 1]] }));

    // we also need to deleted any container volume mounts that use this volume
    setAttachedVolumes(attachedVolumes.filter(av => av.volumeIdx !== idx));
    let newComponents = app.spec.components;
    attachedVolumes
      .filter(av => av.volumeIdx === idx)
      .forEach(av => {
        newComponents = update(newComponents, {
          [av.componentIdx]: {
            containers: {
              [av.containerIdx]: {
                volumes: {
                  $splice: [[av.volumeMountIdx, 1]]
                }
              }
            }
          }
        });
      });

    // update application state
    setApp({
      ...app,
      spec: {
        ...app.spec,
        components: newComponents
      }
    });
  };

  const handleAdd = () => {
    const newType = volumeTypes[0];
    setVolumes(
      update(volumes, {
        $push: [{ _type: newType, volume: newVolume(newType) }]
      })
    );
  };

  let view;
  if (volumes.length > 0) {
    view = (
      <Grid container spacing={10}>
        <Grid item xs={10}>
          {volumes.map((volume, volumeIdx) => (
            <VolumePanel
              key={"volume-" + volumeIdx}
              specPath={["spec", typeKey(volume._type), volume._index]}
              typeKey={typeKey}
              ui={ui}
              setUi={setUi}
              volume={volume}
              onAdd={handleAdd}
              onChange={handleChange(volumeIdx)}
              onDelete={handleDelete(volumeIdx)}
              volumeCreator={newVolume}
              volumeTypes={volumeTypes}
              accessModes={accessModes}
              storageClasses={storageClasses}
            />
          ))}
        </Grid>
        <Grid item xs={2}>
          <WizardNav onSubmit={handleSubmit} routes={ui.routes} />
        </Grid>
      </Grid>
    );
  } else {
    view = (
      <EmptyResourceView
        ui={ui}
        name="Volume"
        onSubmit={handleSubmit}
        onAdd={handleAdd}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <div className={classes.root}>{view}</div>
    </form>
  );
}

Volumes.propTypes = {
  app: PropTypes.object.isRequired,
  setApp: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
  setUi: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const styles = {
  root: {
    display: "flex"
  }
};

export default withStyles(styles)(Volumes);
