import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link, withRouter } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1,
  },
};

class WizardTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
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
          <Tab label="Application Details" component={Link} value="/" to="/" />
          <Tab label="Service" component={Link} value="/service" to="/service" />
          <Tab label="Ingress" component={Link} value="/ingress" to="/ingress" />
          <Tab label="Volumes" component={Link} value="/volumes" to="/volumes" />
          <Tab label="Performance" component={Link} value="/performance" to="/performance" />
          <Tab label="Health" component={Link} value="/health" to="/health" />
          <Tab label="Container" component={Link} value="/container" to="/container" />
          <Tab label="Optimize" component={Link} value="/optimize" to="/optimize" />
          <Tab label="Submit" component={Link} value="/submit" to="/submit" />
        </Tabs>
      </Paper>
    );
  }
}

WizardTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(WizardTabs));
