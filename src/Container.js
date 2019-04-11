import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import WizardNav from './WizardNav'
import DialogNoServices from './DialogNoServices'
import ContainerPanel from './ContainerPanel'
import { submitContainers } from './actions/index'

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
    submitContainers: payload => dispatch(submitContainers(payload)),
  };
};

const imagePullPolicies = [ "Always", "IfNotPresent" ];

class Container extends Component {
  handleSubmit = event => {
    event.preventDefault();

    const containers = Object.keys(this.state.containers).map((serviceIdx, containerIdx) => {
      return this.state.containers[containerIdx];
    }).flat();

    const containerMap = containers.reduce((obj, container) => {
      if (!obj[container.serviceName]) obj[container.serviceName] = [];
      obj[container.serviceName].push(container);
      return obj;
    }, {})

    const app = Object.assign({}, this.props.application, {
      ...this.props.application,
      services: this.props.application.services.map((s) => {
        return Object.assign({}, s, { containers: (containerMap[s.name] || []) });
      }),
    });

    this.props.submitContainers(app);
  };

  handleAddContainer = event => {
    this.setState({
      containers: [
        ...this.state.containers,
        {
          name: "",
          image: "",
          serviceName: this.props.application.services[0].name,
          imagePullPolicy: imagePullPolicies[1],
        }
      ],
    })
  };

  constructor(props) {
    super(props);

    const containerMap = this.props.application.services.reduce((m, service, serviceIdx) => {
      m[serviceIdx] = Object.keys(service.containers).map((containerIdx) => {
        return service.containers[containerIdx];
      });
      return m;
    }, {});

    this.state = Object.assign({}, {
      containers: containerMap,
    });
  }

  render() {
    const { routes, classes } = this.props;
    const { services } = this.props.application;
    const { containers } = this.state;

    const containerCount = Object.keys(containers).reduce((n, serviceIdx) => {
      return n + containers[serviceIdx].length;
    }, 0);

    // lookup the validation error for a particular container
    const containerValidationErrors = (serviceIdx, containerIdx) => {
      if (this.props.ui.validationErrors[serviceIdx]) {
        return this.props.ui.validationErrors[serviceIdx][containerIdx] || {};
      }

      return {};
    };

    if (services.length === 0) {
      return (
        <DialogNoServices resource={"containers"} />
      );
    }

    let view;
    if (containerCount.length === 0) {
      view = (
        <div className={classes.actionRow}>
          <Button variant="contained" color="primary" className={classes.button} onClick={this.handleAddContainer}>
            Add Container
            <Icon className={classes.rightIcon}>add_circle</Icon>
          </Button>
        </div>
      );
    } else {
      view = (
        <>
          {Object.keys(containers).map((container, serviceIdx) => {
             return containers[serviceIdx].map((container, containerIdx) => {
               return (
                 <ContainerPanel
                   key={"container"+containerIdx}
                   container={container}
                   services={services}
                   imagePullPolicies={imagePullPolicies}
                   validationErrors={containerValidationErrors(serviceIdx, containerIdx)}
                 />
               );
            }) }
          )}
        </>
      );
    }

    return (
      <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={10}>
              {view}
            </Grid>
            <Grid item xs={2}>
              <WizardNav routes={routes} />
            </Grid>
          </Grid>
        </div>
      </form>
    );
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Container));
