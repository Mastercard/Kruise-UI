import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { goStep, submitApp, addService, deleteService } from './actions/index'
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
    goStep: path => dispatch(goStep(path)),
    addService: service => dispatch(addService(service)),
    deleteService: service => dispatch(deleteService(service)),
    submitApp: payload => dispatch(submitApp(payload)),
  };
}

class Service extends Component {
  handleSubmit = event => {
    event.preventDefault();

    const app = Object.assign({}, this.props.application, this.state);
    this.props.submitApp(app);
  };

  constructor(props) {
    super(props);

    // initialize local state from application
    this.state = Object.assign({}, { services: props.application.services });

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = idx => event => {
    if (this.hasError(event.target.name)) {
      this.props.clearValidationError(event.target.name);
    }

    this.setState({
      services: this.state.services.map((s, i) => {
        if (i !== idx) {
          return s;
        }

        if (["portName", "port", "targetPort"].includes(event.target.id)) {
          return {
            ...s,
            ports: (s.ports.map((p, j) => {
              return {
                ...p,
                [ event.target.name ]: event.target.value,
              }
            })),
          };
        } else {
          return {
            ...s,
            [ event.target.name ]: event.target.value,
          };
        }
      }),
    });
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

  handleDeleteService = idx => event => {
    this.props.deleteService(idx);
  }

  hasError = field => {
    const appErrors = this.props.ui.validationErrors;
    return appErrors.hasOwnProperty(field);
  };

  render() {
    const { ui, routes, classes, goStep } = this.props;
    const { services } = this.state;

    let view;
    if (services.length > 0) {
      view = <ServicesView
               services={services}
               classes={classes}
               routes={routes}
               goStep={goStep}
               validationErrors={ui.validationErrors.services || {}}
               addService={this.handleAddService}
               handleChange={this.handleChange}
               deleteService={this.handleDeleteService}
      />;
    } else {
      view = <NoServicesView
               classes={classes}
               routes={routes}
               goStep={goStep}
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
  const { routes, services, goStep, classes, addService, deleteService, handleChange, validationErrors } = props;
  return (
    <Grid container spacing={24}>
      <Grid item xs={10}>
        {services.map((service, idx) =>
          <ServicePanel
            key={"service-"+idx}
            validationErrors={validationErrors[idx] || {}}
            service={service}
            onChange={handleChange(idx)}
            onDelete={deleteService(idx)} />
        )}
      </Grid>
      <Grid item xs={2}>
        <WizardNav routes={routes} goStep={goStep} />
      </Grid>
      <AddServiceButton cols={12} classes={classes} onClick={addService} />
    </Grid>
  );
}

function NoServicesView(props) {
  const { routes, goStep, classes, addService } = props;
  return (
    <Grid container spacing={24}>
      <AddServiceButton cols={10} classes={classes} onClick={addService} />
      <Grid item xs={2}>
        <WizardNav routes={routes} goStep={goStep} />
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
