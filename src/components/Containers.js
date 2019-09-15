import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import update from "immutability-helper";
import Grid from "@material-ui/core/Grid";
import WizardNav from "./WizardNav";
import DialogNoServices from "./DialogNoServices";
import ContainerPanel from "./ContainerPanel";
import EmptyResourceView from "./EmptyResourceView";
import useApplicationValidator from "../validation";

const imagePullPolicyNames = {
  Always: "Always",
  IfNotPresent: "If not present"
};

function Containers(props) {
  const { app, setApp, ui, setUi, classes } = props;
  const [, , validate] = useApplicationValidator(ui, setUi);
  const services = app.spec.components.map(c => c.service);
  const volumes = [].concat(
    app.spec.configMaps.map(v => {
      return { _type: "ConfigMap", ...v };
    }),
    app.spec.persistentVolumes.map(v => {
      return { _type: "PersistentVolume", ...v };
    })
  );

  const [containers, setContainers] = useState(
    app.spec.components
      .map((s, i) =>
        s.containers.map((c, j) => {
          return {
            ...c,
            _serviceName: s.service.name,
            _componentIdx: i,
            _containerIdx: j
          };
        })
      )
      .flat()
  );

  if (services.length === 0) {
    return <DialogNoServices resource="containers" />;
  }

  const handleSubmit = () => {
    return validate(updateApp());
  };

  const updateApp = () => {
    const componentMap = Object.keys(app.spec.components).reduce((m, i) => {
      m[i] = [];
      return m;
    }, {});

    // containerMap will contain a data structure like:
    // {0: [containers]}
    // where 0 is the index of the component and the containers array includes
    // all containers associated with that component
    const containerMap = containers.reduce((cm, container) => {
      // remove _* vars from container
      // eslint-disable-next-line no-unused-vars
      const { _serviceName, _containerIdx, _componentIdx, ...c } = container;
      cm[_componentIdx].push(c);
      return cm;
    }, componentMap);

    // generate a list of commands to update app
    const commands = Object.keys(containerMap).map(componentIdx => {
      return {
        spec: {
          components: {
            [componentIdx]: {
              containers: { $set: containerMap[componentIdx] }
            }
          }
        }
      };
    });

    // run all commands to update app
    let newApp = { ...app };
    commands.forEach(command => {
      newApp = update(newApp, command);
    });

    // update state
    setApp(newApp);
    return newApp;
  };

  const handleChange = idx => container => {
    setContainers(update(containers, { [idx]: { $set: container } }));
  };

  const handleDelete = idx => () => {
    setContainers(update(containers, { $splice: [[idx, 1]] }));
  };

  const handleAdd = () => {
    setContainers(
      update(containers, {
        $push: [
          {
            _serviceName: services[0].name,
            name: "",
            image: "",
            imageTag: "",
            imagePullPolicy: Object.keys(imagePullPolicyNames)[0],
            command: "",
            portNames: [services[0].ports[0].name],
            volumes: []
          }
        ]
      })
    );
  };

  let view;
  if (containers.length > 0) {
    view = (
      <Grid container spacing={10}>
        <Grid item xs={10}>
          {containers.map((container, containerIdx) => (
            <ContainerPanel
              key={"container-" + containerIdx}
              specPath={[
                "spec",
                "components",
                container._componentIdx.toString(),
                "containers",
                container._containerIdx.toString()
              ]}
              ui={ui}
              setUi={setUi}
              container={container}
              onAdd={handleAdd}
              onChange={handleChange(containerIdx)}
              onDelete={handleDelete(containerIdx)}
              services={services}
              volumes={volumes}
              imagePullPolicyNames={imagePullPolicyNames}
            />
          ))}
        </Grid>
        <Grid item xs={2}>
          <WizardNav onSubmit={handleSubmit} routes={ui.routes} />
        </Grid>
      </Grid>
    );
  } else {
    view = <EmptyResourceView ui={ui} name="Container" onAdd={handleAdd} />;
  }

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <div className={classes.root}>{view}</div>
    </form>
  );
}

Containers.propTypes = {
  app: PropTypes.object.isRequired,
  setApp: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
  setUi: PropTypes.func.isRequired,
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

export default withStyles(styles)(Containers);
