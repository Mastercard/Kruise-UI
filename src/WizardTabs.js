import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { goStep } from './actions/index'

import {
  ROUTE_APP_DETAILS,
  ROUTE_SERVICE,
  ROUTE_INGRESS,
  ROUTE_VOLUMES,
  ROUTE_PERFORMANCE,
  ROUTE_HEALTH,
  ROUTE_CONTAINER,
  ROUTE_OPTIMIZE,
  ROUTE_SUBMIT,
} from './constants/routes';

const styles = {
  root: {
    flexGrow: 1,
  },
};

const mapDispatchToProps = dispatch => {
  return {
    goStep: path => dispatch(goStep(path)),
  }
};

class WizardTabs extends React.Component {
  handleChange = (event, value) => {
    this.props.goStep(value);
  };

  render() {
    const { classes, location } = this.props;

    return (
      <Paper className={classes.root}>
        <Tabs
          value={location.pathname}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          {/* TODO: do I need to the "to" attribute? */}
          <Tab label="App Details" value={ROUTE_APP_DETAILS} to={ROUTE_APP_DETAILS} />
          <Tab label="Service" value={ROUTE_SERVICE} to={ROUTE_SERVICE} />
          <Tab label="Ingress" value={ROUTE_INGRESS} to={ROUTE_INGRESS} />
          <Tab label="Volumes" value={ROUTE_VOLUMES} to={ROUTE_VOLUMES} />
          <Tab label="Performance" value={ROUTE_PERFORMANCE} to={ROUTE_PERFORMANCE} />
          <Tab label="Health" value={ROUTE_HEALTH} to={ROUTE_HEALTH} />
          <Tab label="Container" value={ROUTE_CONTAINER} to={ROUTE_CONTAINER} />
          <Tab label="Optimize" value={ROUTE_OPTIMIZE} to={ROUTE_OPTIMIZE} />
          <Tab label="Submit" value={ROUTE_SUBMIT} to={ROUTE_SUBMIT} />
        </Tabs>
      </Paper>
    );
  }
}

WizardTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(null, mapDispatchToProps)(withRouter(withStyles(styles)(WizardTabs)));
