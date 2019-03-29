import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { nextRoute } from './helpers'
import { goStep } from './actions/index'
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

  render() {
    const { routes, classes, goStep } = this.props;
    const { services } = this.state;

    let view;
    if (services.length > 0) {
      view = <ServicesView services={services} classes={classes} routes={routes} goStep={goStep} />;
    } else {
      view = <NoServicesView routes={routes} classes={classes} goStep={goStep} />;
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
  const { routes, services, goStep, classes } = props;
  return (
    <Grid container spacing={24}>
      <Grid item xs={10}>
        {services.map((service) =>
          <ServicePanel key={"service-"+service.name} service={service} />
        )}
      </Grid>
      <Grid item xs={2}>
        <WizardNav routes={routes} goStep={goStep} />
      </Grid>
      <AddServiceButton cols={12} classes={classes} />
    </Grid>
  );
}

function NoServicesView(props) {
  const { routes, goStep, classes } = props;
  return (
    <Grid container spacing={24}>
      <AddServiceButton cols={10} classes={classes} />
      <Grid item xs={2}>
        <WizardNav routes={routes} goStep={goStep} />
      </Grid>
    </Grid>
  );
}

function AddServiceButton(props) {
  const { cols, classes } = props;
  return (
    <Grid item xs={cols}>
      <div className={classes.actionRow}>
        <Button variant="contained" color="primary" className={classes.button}>
          Add Service
          <Icon className={classes.rightIcon}>add_circle</Icon>
        </Button>
      </div>
    </Grid>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Service));
