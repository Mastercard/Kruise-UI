import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { goStep } from './actions/index'

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
          <Tab label="App Details" value="/" to="/" />
          <Tab label="Service" value="/service" to="/service" />
          <Tab label="Ingress" value="/ingress" to="/ingress" />
          <Tab label="Volumes" value="/volumes" to="/volumes" />
          <Tab label="Performance" value="/performance" to="/performance" />
          <Tab label="Health" value="/health" to="/health" />
          <Tab label="Container" value="/container" to="/container" />
          <Tab label="Optimize" value="/optimize" to="/optimize" />
          <Tab label="Submit" value="/submit" to="/submit" />
        </Tabs>
      </Paper>
    );
  }
}

WizardTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(null, mapDispatchToProps)(withRouter(withStyles(styles)(WizardTabs)));
