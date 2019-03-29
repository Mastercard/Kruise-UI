import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { nextRoute } from './helpers'
import { goStep, addService } from './actions/index'
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
    routes: state.routes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    goStep: path => dispatch(goStep(path)),
    addService: service => dispatch(addService(service)),
  };
}

class Service extends Component {
  handleSubmit = event => {
    event.preventDefault();
    const { goStep, routes, location } = this.props;
    goStep(nextRoute(routes, location));
  };

  constructor(props) {
    super(props);

    // initialize local state from application
    this.state = Object.assign({}, { services: props.application.services });
    /* if (this.state.services.length === 0) {
     *   this.state.services.push({
     *     name: "",
     *     type: "ClusterIP",
     *     ports: [
     *       {
     *         name: "",
     *         port: 8080,
     *         targetPort: "",
     *       }
     *     ]
     *   });
     * } */
    console.log("service", this.state);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleAddService = event => {
    this.props.addService({
      name: "",
      type: "ClusterIP",
      ports: [
        {
          name: "",
          port: 8080,
          targetPort: "",
        }
      ]
    });
  }

  render() {
    console.log(this.props);
    const { routes, classes, goStep } = this.props;
    const { services } = this.props.application;

    let view;
    if (services.length > 0) {
      view = <ServicesView
               services={services}
               classes={classes}
               routes={routes}
               goStep={goStep}
               addService={this.handleAddService} />;
    } else {
      view = <NoServicesView
               classes={classes}
               routes={routes}
               goStep={goStep}
               addService={this.handleAddService} />;
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
  const { routes, services, goStep, classes, addService } = props;
  return (
    <Grid container spacing={24}>
      <Grid item xs={10}>
        {services.map((service, idx) =>
          <ServicePanel key={"service-"+idx} service={service} />
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
