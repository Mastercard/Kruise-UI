import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { withStyles } from "@material-ui/core/styles";
import { navigate, Location } from "@reach/router";

function WizardNav(props) {
  return (
    <Location>
      {({ location }) => (
        <WizardNavButtons
          classes={props.classes}
          routes={props.routes}
          location={location}
          onSubmit={props.onSubmit}
        />
      )}
    </Location>
  );
}

function WizardNavButtons(props) {
  const submitAndNavigate = path => () => {
    props.onSubmit();
    navigate(path);
  };

  const { routes, location, classes } = props;

  const nextRoute = () => {
    const nextIdx = routes.findIndex(r => r.path === location.pathname) + 1;
    if (nextIdx > routes.length - 1) {
      // at the end of the routes. return current location
      return location.pathname;
    }
    return routes[nextIdx].path;
  };

  const prevRoute = () => {
    const prevIdx = routes.findIndex(r => r.path === location.pathname) - 1;
    if (prevIdx >= 0) {
      return routes[prevIdx].path;
    }
    return null;
  };

  let nextButtonDisabled = false;
  let next = nextRoute(location);
  if (next === location.pathname) {
    // there are no steps remaining
    nextButtonDisabled = true;
  }

  let prev = prevRoute(location);

  return (
    <div>
      <IconButton
        disabled={!prev}
        className={classes.button}
        onClick={submitAndNavigate(prev)}
      >
        <ArrowBack />
      </IconButton>
      {!nextButtonDisabled && (
        <Button
          disabled={nextButtonDisabled}
          size="large"
          variant="contained"
          color="primary"
          className={classes.button}
          fullWidth={false}
          onClick={submitAndNavigate(next)}
        >
          Next
        </Button>
      )}
    </div>
  );
}

WizardNav.propTypes = {
  classes: PropTypes.object.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSubmit: PropTypes.func.isRequired
};

WizardNavButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
};

const styles = theme => ({
  button: {
    marginRight: theme.spacing(1)
  }
});

export default withStyles(styles)(WizardNav);
