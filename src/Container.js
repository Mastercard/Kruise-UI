import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import WizardNav from './WizardNav'
import DialogNoServices from './DialogNoServices'
import ContainerPanel from './ContainerPanel'
import { submitContainers, clearValidationError } from './actions/index'

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
    clearValidationError: (keys, field) => dispatch(clearValidationError(keys, field)),
  };
};

const imagePullPolicies = [ "Always", "IfNotPresent" ];

class Container extends Component {
  handleSubmit = event => {
    event.preventDefault();

    console.group("Container", "handleSubmit");
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

    this.setState({ containers: this.localState(app) });

    console.groupEnd();
    this.props.submitContainers(app);
  };

  localState = app => {
    return app.services.reduce((m, service, serviceIdx) => {
      m[serviceIdx] = Object.keys(service.containers).map((containerIdx) => {
        return service.containers[containerIdx];
      });
      return m;
    }, {});
  };

  handleAddContainer = serviceIdx => event => {
    let newContainers = [
      ...this.state.containers[serviceIdx],
      {
        name: "",
        image: "",
        serviceName: this.props.application.services[serviceIdx].name,
        imagePullPolicy: imagePullPolicies[1],
      },
    ]
    console.log("newContainers", newContainers);

    let newState = Object.assign({}, this.state.containers);
    newState[serviceIdx] = newContainers;
    console.log("newState", newState);

    this.setState({
      containers: newState,
    });

    console.log("state", this.state);
    console.groupEnd();
  };

  handleChange = (serviceIdx, containerIdx) => event => {
    console.group("Container","handleChange");
    console.log("serviceIdx", serviceIdx, "containerIdx", containerIdx);

    const { name, value } = event.target;
    console.log("name", name, "value", value);

    this.props.clearValidationError([ serviceIdx, "containers", containerIdx], name);

    const newContainer = Object.assign({}, this.state.containers[serviceIdx][containerIdx], {
      [ name ]: value,
    });
    console.log("newContainer", newContainer);

    let newState = Object.assign({}, this.state.containers);
    newState[serviceIdx][containerIdx] = newContainer;

    console.log("oldState", this.state);
    console.log("newState", newState);

    this.setState({ containers: newState });

    console.groupEnd();
  };

  constructor(props) {
    super(props);

    this.state = Object.assign({}, {
      containers: this.localState(this.props.application),
    });
  }

  render() {
    console.group("Container", "render");
    console.group("validationErrors", this.props.ui.validationErrors);
    console.groupEnd();
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
          <Button variant="contained" color="primary" className={classes.button} onClick={this.handleAddContainer(0)}>
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
                   onChange={this.handleChange(serviceIdx, containerIdx)}
                   onAdd={this.handleAddContainer(serviceIdx)}
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
