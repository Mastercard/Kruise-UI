import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

function ErrorNotifications(props) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    props.dismiss();
  };

  const { error, classes } = props;

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      open={error != null}
      onClose={handleClose}
      autoHideDuration={6000}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
      message={<span id="message-id">{error}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      ]}
    />
  );
}

ErrorNotifications.propTypes = {
  classes: PropTypes.object.isRequired,
  dismiss: PropTypes.func.isRequired,
  error: PropTypes.string
};

const styles = theme => ({
  close: {
    padding: theme.spacing(2)
  }
});

export default withStyles(styles)(ErrorNotifications);
