import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    display: 'flex',
  },
});

class Service extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Typography component="h1" variant="h2" color="inherit" noWrap className={classes.title}>
          Service
        </Typography>
      </div>
    )
  }
}

export default withStyles(styles)(Service);
