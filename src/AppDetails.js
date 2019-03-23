import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    display: 'flex',
  },
});

class AppDetails extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Typography component="h1" variant="h2" color="inherit" noWrap className={classes.title}>
        AppDetails
      </Typography>
    )
  }
}

export default withStyles(styles)(AppDetails);
