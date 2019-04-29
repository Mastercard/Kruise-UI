import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import { prevRoute, nextRoute } from './helpers'
import { goStep } from './actions/index'

const styles = theme => ({
  button: {
    marginRight: theme.spacing.unit,
  },
});

const mapStateToProps = state => {
  return {
    routes: state.routes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    goStep: path => dispatch(goStep(path)),
  };
}

class WizardNav extends React.Component {
  handleBack = path => event => {
    this.props.goStep(path);
  };

  render() {
    const { routes, location, classes } = this.props;

    let nextButtonDisabled = false;
    let next = nextRoute(routes, location)
    if (next === location.pathname) {
      // there are no steps remaining
      nextButtonDisabled = true;
    }

    let prev = prevRoute(routes, location);

    return (
      <div>
        <IconButton disabled={!prev} className={classes.button} onClick={this.handleBack(prev)}>
          <ArrowBack />
        </IconButton>
        {!nextButtonDisabled &&
         <Button
           type="submit"
           disabled={nextButtonDisabled}
           size="large"
           variant="contained"
           color="primary"
           className={classes.button}
           fullWidth={false}
         >
           Next
         </Button>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(WizardNav)));
