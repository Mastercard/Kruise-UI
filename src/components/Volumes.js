import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import WizardNav from "./WizardNav";

function Volumes(props) {
  const { ui, classes } = props;
  // const services = app.spec.components.map(c => c.service);

  const handleSubmit = event => {
    if (event) event.preventDefault();
  };

  function NoVolumesView() {
    return (
      <Grid container spacing={10}>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <div className={classes.actionRow}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Add Volume
              <AddCircleIcon className={classes.rightIcon} />
            </Button>
          </div>
        </Grid>
        <Grid item xs={2}>
          <WizardNav routes={ui.routes} />
        </Grid>
      </Grid>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <div className={classes.root}>{<NoVolumesView />}</div>
    </form>
  );
}

Volumes.propTypes = {
  app: PropTypes.object.isRequired,
  setApp: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
  root: {
    display: "flex"
  },
  button: {
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  actionRow: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    textAlign: "center"
  }
});

export default withStyles(styles)(Volumes);
