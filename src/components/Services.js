import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import update from "immutability-helper";
import Grid from "@material-ui/core/Grid";
import WizardNav from "./WizardNav";
import ServicePanel from "./ServicePanel";
import EmptyResourceView from "./EmptyResourceView";

function Services(props) {
  const { app, setApp, ui, classes } = props;
  const services = app.spec.components.map(c => c.service);

  const handleSubmit = () => {};

  const changeService = idx => s => {
    setApp(
      update(app, {
        spec: { components: { [idx]: { service: { $set: s } } } }
      })
    );
  };

  const addService = () => {
    setApp(
      update(app, {
        spec: {
          components: {
            $push: [
              {
                service: {
                  name: "",
                  type: "ClusterIP",
                  ports: [
                    {
                      name: "",
                      port: 8080,
                      targetPort: ""
                    }
                  ]
                },
                ingresses: [],
                containers: []
              }
            ]
          }
        }
      })
    );
  };

  const deleteService = idx => () => {
    setApp(
      update(app, {
        spec: {
          components: {
            $splice: [[idx, 1]]
          }
        }
      })
    );
  };

  let view;
  if (services.length > 0) {
    view = (
      <Grid container spacing={10}>
        <Grid item xs={10}>
          {services.map((service, serviceIdx) => (
            <ServicePanel
              key={"service-" + serviceIdx}
              ui={ui}
              service={service}
              onChange={changeService(serviceIdx)}
              onDelete={deleteService(serviceIdx)}
              onAdd={addService}
            />
          ))}
        </Grid>
        <Grid item xs={2}>
          <WizardNav routes={ui.routes} onSubmit={handleSubmit} />
        </Grid>
      </Grid>
    );
  } else {
    view = <EmptyResourceView ui={ui} name="Service" onAdd={addService} />;
  }

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <div className={classes.root}>{view}</div>
    </form>
  );
}

Services.propTypes = {
  app: PropTypes.object.isRequired,
  setApp: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const styles = {
  root: {
    display: "flex"
  }
};

export default withStyles(styles)(Services);
