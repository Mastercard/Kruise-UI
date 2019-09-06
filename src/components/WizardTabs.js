import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link, Location } from "@reach/router";

function WizardTabs(props) {
  const { classes } = props;

  return (
    <Location>
      {({ location }) => (
        <Paper className={classes.root}>
          <Tabs
            value={location.pathname}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            {props.routes.map(r => (
              <Tab
                key={r.path}
                label={r.name}
                value={r.path}
                component={Link}
                to={r.path}
              />
            ))}
          </Tabs>
        </Paper>
      )}
    </Location>
  );
}

WizardTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired
};

const styles = {
  root: {
    flexGrow: 1
  }
};

export default withStyles(styles)(WizardTabs);
