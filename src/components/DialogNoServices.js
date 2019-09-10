import React from "react";
import { navigate } from "@reach/router";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function DialogNoServices() {
  const handleServicesClick = () => {
    navigate("/services");
  };

  return (
    <Dialog
      open={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"No services defined."}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Before you can create {this.props.resource}, you must first define a
          service.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleServicesClick} color="primary" autoFocus>
          Services
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogNoServices;
