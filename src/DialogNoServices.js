import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { goStep } from './actions/index'
import { ROUTE_SERVICE } from './constants/routes.js'

const mapDispatchToProps = dispatch => {
  return {
    goStep: path => dispatch(goStep(path)),
  };
}

class DialogNoServices extends Component {
  handleServicesClick = event => {
    this.props.goStep(ROUTE_SERVICE);
  };

  render() {
    return (
      <Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"No services defined."}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Before you can create {this.props.resource}, you must first define a service.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleServicesClick} color="primary" autoFocus>
            Services
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
}

export default connect(null, mapDispatchToProps)(DialogNoServices);
