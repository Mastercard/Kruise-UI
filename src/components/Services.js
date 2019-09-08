import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import update from "immutability-helper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import WizardNav from "./WizardNav";
import ServicePanel from "./ServicePanel";

function Services(props) {
  const { app, setApp, ui, classes } = props;
  const services = app.spec.components.map(c => c.service);

  const handleServiceChange = idx => s => {
    setApp(
      update(app, {
        spec: { components: { [idx]: { service: { $set: s } } } }
      })
    );
  };

  const handleSubmit = event => {
    if (event) event.preventDefault();
    console.log("TODO: submitService");
  };

  const addService = event => {
    if (event) event.preventDefault();
    console.log("TODO: addService");
  };

  let view;
  if (services.length > 0) {
    view = (
      <ServicesView
        onChange={handleServiceChange}
        ui={ui}
        services={services}
        classes={classes}
      />
    );
  } else {
    view = <NoServicesView ui={ui} classes={classes} addService={addService} />;
  }

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <div className={classes.root}>{view}</div>
    </form>
  );
}

function ServicesView(props) {
  const { ui, services } = props;

  return (
    <Grid container spacing={10}>
      <Grid item xs={10}>
        {services.map((service, serviceIdx) => (
          <ServicePanel
            key={"service-" + serviceIdx}
            ui={ui}
            service={service}
            onChange={props.onChange(serviceIdx)}
          />
        ))}
      </Grid>
      <Grid item xs={2}>
        <WizardNav routes={ui.routes} />
      </Grid>
    </Grid>
  );
}

function NoServicesView(props) {
  const { ui, classes, addService } = props;
  return (
    <Grid container spacing={10}>
      <Grid item xs={2} />
      <Grid item xs={8}>
        <div className={classes.actionRow}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={addService}
          >
            Add Service
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

Services.propTypes = {
  app: PropTypes.object.isRequired,
  setApp: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

ServicesView.propTypes = {
  ui: PropTypes.object.isRequired,
  services: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired
};

NoServicesView.propTypes = {
  ui: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  addService: PropTypes.func.isRequired
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

export default withStyles(styles)(Services);
