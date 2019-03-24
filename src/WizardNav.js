import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Link, withRouter } from "react-router-dom";
import { prevRoute, nextRoute } from './helpers'

const styles = theme => ({
  button: {
    marginRight: theme.spacing.unit,
  },
});

class WizardNav extends React.Component {
  render() {
    const { routes, location, classes } = this.props;

    let nextButtonDisabled = false;
    let next = nextRoute(routes, location)
    if (next === location.pathname) {
      // there are no steps remaining
      nextButtonDisabled = true;
    }

    let prev = prevRoute(routes, location);
    let backButton;

    if (prev) {
      backButton =
        <Button
          disabled={false}
          className={classes.button}
          component={Link}
          to={prev}
        >
          Back
        </Button>;
    } else {
      backButton =
        <Button
          disabled={true}
          className={classes.button}
        >
          Back
        </Button>;
    }

    return (
      <div>
        {backButton}
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
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(WizardNav));
