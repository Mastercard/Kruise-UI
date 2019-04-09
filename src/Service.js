// TODO: prevent deletion of only port in service

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { submitServices, deleteService, clearValidationError } from './actions/index'
import WizardNav from './WizardNav'
import ServicePanel from './ServicePanel'

const styles = theme => ({
  root: {
    display: 'flex',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  actionRow: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: 'center',
  },
});

const mapStateToProps = state => {
  return {
    application: state.application,
    ui: state.ui,
    routes: state.routes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteService: service => dispatch(deleteService(service)),
    submitServices: payload => dispatch(submitServices(payload)),
    clearValidationError: (keys, field) => dispatch(clearValidationError(keys, field)),
  };
}

class Service extends Component {
  handleSubmit = event => {
    event.preventDefault();

    const app = Object.assign({}, this.props.application, this.state);
    this.props.submitServices(app);
  };

  constructor(props) {
    super(props);

    // initialize local state from application
    this.state = Object.assign({}, {
      services: props.application.services,
      ingress: props.application.ingress,
    });

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (type, serviceIdx, portIdx) => event => {
    const { name, value } = event.target;

    if (this.hasError(serviceIdx, portIdx)(name)) {
      this.props.clearValidationError([ serviceIdx, "ports", portIdx], name);
    }

    if (type === "service") {
      const oldService = this.state.services[serviceIdx];

      this.setState({
        ingress: {
          ...this.state.ingress,
          rules: this.state.ingress.rules.map((r, i) => {
            if (name === "name") {
              // service name is changing
              if (oldService.name === r.serviceName) {
                return Object.assign({}, r, { serviceName: value });
              }
            }
            return i;
          }),
        },
        services: this.state.services.map((s, i) => {
          if (i !== serviceIdx) {
            return s;
          }

          return {
            ...s,
            [ name ]: value,
          };
        }),
      });
    }

    if (type === "port") {
      this.setState({
        services: this.state.services.map((s, i) => {
          if (i !== serviceIdx) {
            return s;
          }

          return {
            ...s,
            ports: (s.ports.map((p, j) => {
              if (j !== portIdx) {
                return p;
              }
              return {
                ...p,
                [ name ]: value,
              }
            })),
          };
        }),
      });
    }
  };

  handleAddService = event => {
    this.setState({
      services: [
        ...this.state.services,
        {
          name: "",
          type: "ClusterIP",
          ports: [
            {
              name: "",
              port: 8080,
              targetPort: "",
            }
          ]
        }
      ],
    })
  }

  handleDeleteService = serviceIdx => event => {
    const deletedService = this.state.services[serviceIdx];
    this.setState({
      ingress: {
        ...this.state.ingress,
        rules: this.state.ingress.rules.filter((r, i) => {
          if (r.serviceName === deletedService.name) {
            return false;
          }
          return true;
        }),
      },
      services: [
        ...this.state.services.slice(0, serviceIdx),
        ...this.state.services.slice(serviceIdx + 1),
      ],
    });
  }

  handleAddServicePort = serviceIdx => event => {
    this.setState({
      services: this.state.services.map((s, i) => {
        if (i !== serviceIdx) {
          return s;
        }

        return { ...s, ports: [...s.ports, { port: 8080 }] };
      }),
    });
  }

  handleDeleteServicePort = (serviceIdx, portIdx) => event => {
    this.setState({
      services: this.state.services.map((s, i) => {
        if (i !== serviceIdx) {
          return s;
        }

        return {
          ...s,
          ports: [
            ...s.ports.slice(0, portIdx),
            ...s.ports.slice(portIdx + 1),
          ],
        };
      }),
    });
  }

  hasError = (serviceIndex, servicePortIndex) => field => {
    let appErrors = this.props.ui.validationErrors[serviceIndex];
    if (appErrors && servicePortIndex !== undefined) {
      appErrors = (appErrors["ports"] || {})[servicePortIndex];
    }
    return appErrors && appErrors.hasOwnProperty(field);
  };

  render() {
    /* TODO: rename handlers to onAddService, etc */

    const { ui, routes, classes } = this.props;
    const { services } = this.state;

    let view;
    if (services.length > 0) {
      view = <ServicesView
               services={services}
               classes={classes}
               routes={routes}
               validationErrors={ui.validationErrors}
               addService={this.handleAddService}
               addServicePort={this.handleAddServicePort}
               handleChange={this.handleChange}
               deleteService={this.handleDeleteService}
               deleteServicePort={this.handleDeleteServicePort}
      />;
    } else {
      view = <NoServicesView
               classes={classes}
               routes={routes}
               addService={this.handleAddService}
      />;
    }

    return (
      <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
        <div className={classes.root}>
          {view}
        </div>
      </form>
    )
  }
}

function ServicesView(props) {
  const {
    routes,
    services,
    addService,
    addServicePort,
    deleteService,
    deleteServicePort,
    handleChange,
    validationErrors,
  } = props;

  return (
    <Grid container spacing={24}>
      <Grid item xs={10}>
        {services.map((service, serviceIdx) =>
          <ServicePanel
            key={"service-"+serviceIdx}
            validationErrors={validationErrors[serviceIdx] || {}}
            service={service}
            serviceIndex={serviceIdx}
            addServicePort={addServicePort(serviceIdx)}
            deleteServicePort={deleteServicePort}
            onAddService={addService}
            onChange={handleChange}
            onDelete={deleteService(serviceIdx)} />
        )}
      </Grid>
      <Grid item xs={2}>
        <WizardNav routes={routes} />
      </Grid>
    </Grid>
  );
}

function NoServicesView(props) {
  const { routes, classes, addService } = props;
  return (
    <Grid container spacing={24}>
      <AddServiceButton cols={10} classes={classes} onClick={addService} />
      <Grid item xs={2}>
        <WizardNav routes={routes} />
      </Grid>
    </Grid>
  );
}

function AddServiceButton(props) {
  const { cols, classes, onClick } = props;
  return (
    <Grid item xs={cols}>
      <div className={classes.actionRow}>
        <Button variant="contained" color="primary" className={classes.button} onClick={onClick}>
          Add Service
          <Icon className={classes.rightIcon}>add_circle</Icon>
        </Button>
      </div>
    </Grid>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Service));
