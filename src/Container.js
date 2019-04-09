import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import WizardNav from './WizardNav'
import DialogNoServices from './DialogNoServices'
import ContainerPanel from './ContainerPanel'
import { goStep } from './actions/index'
import { ROUTE_SUBMIT } from './constants/routes.js'

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
};

const imagePullPolicies = [ "Always", "IfNotPresent" ];

class Container extends Component {
  handleSubmit = event => {
    event.preventDefault();
    const app = Object.assign({}, this.props.application, this.state);
    console.log(app);
    this.props.goStep(ROUTE_SUBMIT);
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

    const allContainers = this.props.application.services.reduce((containers, service) => {
      if (service.containers && service.containers.length > 0) {
        service.containers.forEach((c) => {
          containers.push(c);
        });
      }
      return containers;
    }, []);
    this.state = Object.assign({}, {
      containers: allContainers,
    });
  }

  render() {
    const { routes, classes } = this.props;
    const { services } = this.props.application;
    const { containers } = this.state;

    if (services.length === 0) {
      return (
        <DialogNoServices resource={"containers"} />
      );
    }

    let view;
    if (containers.length === 0) {
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
          {containers.map((container, containerIdx) =>
            <ContainerPanel
              key={"container"+containerIdx}
              container={container}
              services={services}
              imagePullPolicies={imagePullPolicies}
            />
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
