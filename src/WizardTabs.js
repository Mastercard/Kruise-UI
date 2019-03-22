import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Application Details" />
          <Tab label="Service" />
          <Tab label="Ingress" />
          <Tab label="Volumes" />
          <Tab label="Performance" />
          <Tab label="Health" />
          <Tab label="Container" />
          <Tab label="Optimize" />
          <Tab label="Submit" />
        </Tabs>
      </Paper>
    );
  }
}

WizardTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WizardTabs);
