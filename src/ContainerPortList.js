import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';
import { setContainerPorts } from './actions/index'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  chip: {
    margin: theme.spacing.unit,
  },
});

const mapDispatchToProps = dispatch => {
  return {
    setContainerPorts: (si, ci, ports) => dispatch(setContainerPorts(si, ci, ports)),
  };
};

class ContainerPortList extends Component {
  portSelected = (port) => {
    /* return this.state.ports.indexOf(port) >= 0; */
    const containerPorts = this.props.container.ports || [];
    return containerPorts.indexOf(port) >= 0;
  };

  togglePort = port => event => {
    const { serviceIdx, containerIdx } = this.props;

    let newPorts;
    const containerPorts = this.props.container.ports || [];
    if (containerPorts.indexOf(port) >= 0) {
      // remove it
      newPorts = containerPorts.filter(p => p !== port);
    } else {
      // add it
      newPorts = [ ...containerPorts, port ];
    }

    this.props.setContainerPorts(serviceIdx, containerIdx, newPorts);
  };

  constructor(props) {
    super(props);
    this.state = { ports: this.props.container.ports || [] };
  }

  render() {
    const { classes } = this.props;

    const portChips = this.props.ports.map((p, idx) => {
      const isSelected = this.portSelected(p.name);
      const onToggle = this.togglePort(p.name);
      return (
        <Chip
          key={p.name+"-"+idx}
          color={isSelected ? "primary" : "default"}
          label={p.name}
          onClick={onToggle}
          onDelete={onToggle}
          className={classes.chip}
          deleteIcon={isSelected ? <CancelIcon /> : <DoneIcon />}
        />
      );
    });

    return (
      <div className={classes.root}>
        <Typography variant="overline" align="left" gutterBottom>
          ports
        </Typography>
        {portChips}
      </div>
    );
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(ContainerPortList));
