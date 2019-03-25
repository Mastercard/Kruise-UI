import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import { dismissError } from './actions/index'

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

const mapStateToProps = state => {
  return { ui: state.ui };
};

const mapDispatchToProps = dispatch => {
  return {
    dismissError: () => dispatch(dismissError()),
  };
}

class ErrorNotifications extends Component {
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.props.dismissError();
  };

  render() {
    const { ui, classes } = this.props;

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={ui.error != null}
        onClose={this.handleClose}
        autoHideDuration={6000}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{ui.error}</span>}
        action={[
          <IconButton
            key="close"
                 aria-label="Close"
                 color="inherit"
                 className={classes.close}
        onClick={this.handleClose}
            >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    );
  }
}

ErrorNotifications.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ErrorNotifications));
