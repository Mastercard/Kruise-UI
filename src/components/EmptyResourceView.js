import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import WizardNav from "./WizardNav";

function EmptyResourceView(props) {
  const { ui, classes, onAdd } = props;
  return (
    <Grid container spacing={10}>
      <Grid item xs={2} />
      <Grid item xs={8}>
        <div className={classes.actionRow}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={onAdd}
          >
            Add {props.name}
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

EmptyResourceView.propTypes = {
  name: PropTypes.string.isRequired,
  ui: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
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

export default withStyles(styles)(EmptyResourceView);
