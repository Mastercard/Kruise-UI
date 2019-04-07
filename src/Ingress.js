import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { submitIngress, clearValidationError } from './actions/index'
import WizardNav from './WizardNav'
import IngressRulePanel from './IngressRulePanel'

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
    submitIngress: payload => dispatch(submitIngress(payload)),
    clearValidationError: (keys, field) => dispatch(clearValidationError(keys, field)),
  };
}

class Ingress extends Component {
  handleSubmit = event => {
    event.preventDefault();

    const app = Object.assign({}, this.props.application, this.state);
    this.props.submitIngress(app);
  };

  constructor(props) {
    super(props);

    // initialize local state from application
    this.state = Object.assign({}, {
      ingress: props.application.ingress,
      servicePorts: this.servicePortMap()[this.defaultService()],
    });

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  servicePortMap = () => {
    return this.props.application.services.reduce((obj, service) => {
      obj[service.name] = service.ports.map((s) => {
        return s.name;
      });
      return obj;
    }, {});
  };

  defaultService = () => {
    // TODO: can props.application.services ever be undefined? if so, prevent
    return this.props.application.services[0].name;
  };

  handleAddIngressRule = event => {
    const defService = this.defaultService();
    this.setState({
      ingress: {
        ...this.state.ingress,
        name: this.props.application.name + "-ingress",
        rules: [
          ...this.state.ingress.rules,
          {
            host: "",
            serviceName: defService,
            servicePort: this.servicePortMap()[defService][0],
          },
        ],
      },
    });
  };

  handleDeleteIngressRule = ingressRuleIdx => event => {
    this.setState({
      ingress: {
        ...this.state.ingress,
        rules: [
          ...this.state.ingress.rules.slice(0, ingressRuleIdx),
          ...this.state.ingress.rules.slice(ingressRuleIdx + 1),
        ],
      },
    });
  };

  handleChange = ingressRuleIdx => event => {
    const { name, value } = event.target;

    this.props.clearValidationError([ "rules", ingressRuleIdx ], name);

    let update = {
      ingress: {
        ...this.state.ingress,
        rules: this.state.ingress.rules.map((ingressRule, i) => {
          if (i !== ingressRuleIdx) {
            return ingressRule;
          }

          return {
            ...ingressRule,
            [ name ]: value,
          }
        }),
      },
    };

    if (name === "serviceName" && value !== this.state.ingress.rules[ingressRuleIdx].serviceName) {
      const servicePorts = this.servicePortMap();
      update.ingress = {
        ...this.state.ingress,
        rules: this.state.ingress.rules.map((ingressRule, i) => {
          if (i !== ingressRuleIdx) {
            return ingressRule;
          }

          return {
            ...ingressRule,
            serviceName: value,
            servicePort: servicePorts[value][0],
          };
        }),
      };
      update.servicePorts = this.servicePortMap()[value];
    }

    this.setState(update);
  };

  render() {
    const { ui, routes, classes, goStep } = this.props;
    const { services } = this.props.application;
    const { ingress, servicePorts } = this.state;

    let view;
    if (ingress.rules.length > 0) {
      view = <IngressView
               ingress={ingress}
               services={services}
               servicePorts={servicePorts}
               routes={routes}
               goStep={goStep}
               handleChange={this.handleChange}
               handleAddIngressRule={this.handleAddIngressRule}
               handleDeleteIngressRule={this.handleDeleteIngressRule}
               validationErrors={ui.validationErrors.rules || {}}
      />
    } else {
      view = <NoIngressRulesView
               classes={classes}
               routes={routes}
               goStep={goStep}
               onAdd={this.handleAddIngressRule}
      />
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

function IngressView(props) {
  return (
    <Grid container spacing={24}>
      <Grid item xs={10}>
        {props.ingress.rules.map((ingressRule, ingressRuleIdx) =>
          <IngressRulePanel
            key={"ingress-rule-"+ingressRuleIdx}
            ingressRule={ingressRule}
            services={props.services}
            servicePorts={props.servicePorts}
            ingressRuleIndex={ingressRuleIdx}
            onChange={props.handleChange}
            onAdd={props.handleAddIngressRule}
            onDelete={props.handleDeleteIngressRule(ingressRuleIdx)}
            validationErrors={props.validationErrors[ingressRuleIdx]}
          />
        )}
      </Grid>
      <Grid item xs={2}>
        <WizardNav routes={props.routes} goStep={props.goStep} />
      </Grid>
    </Grid>
  );
}

function NoIngressRulesView(props) {
  const {
    routes,
    goStep,
    classes,
    onAdd,
  } = props;

  return (
    <Grid container spacing={24}>
      <AddIngressRuleButton cols={10} classes={classes} onClick={onAdd} />
      <Grid item xs={2}>
        <WizardNav routes={routes} goStep={goStep} />
      </Grid>
    </Grid>
  );
}

function AddIngressRuleButton(props) {
  const { cols, classes, onClick } = props;
  return (
    <Grid item xs={cols}>
      <div className={classes.actionRow}>
        <Button variant="contained" color="primary" className={classes.button} onClick={onClick}>
          Add Ingress Rule
          <Icon className={classes.rightIcon}>add_circle</Icon>
        </Button>
      </div>
    </Grid>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Ingress));
