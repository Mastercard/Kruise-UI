import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { goStep } from './actions/index'
import { ROUTE_SUBMIT } from './constants/routes.js'

const styles = {
  root: {
    flexGrow: 1,
  },
};

const mapStateToProps = state => {
  return { routes: state.routes };
};

const mapDispatchToProps = dispatch => {
  return {
    goStep: path => dispatch(goStep(path)),
  }
};

class WizardTabs extends React.Component {
  handleChange = (event, value) => {
    if (value === ROUTE_SUBMIT) {
      return;
    }
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
          {this.props.routes.map((r) =>
            <Tab key={r.path} label={r.name} value={r.path} />
          )}
        </Tabs>
      </Paper>
    );
  }
}

WizardTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(WizardTabs)));
