import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import useApplicationValidator from "../validation";

function IngressPanel(props) {
  const { ui, ingress, services, serviceName, classes } = props;
  const [hasError] = useApplicationValidator(ui);
  const servicePorts = services
    .find(s => s.name === serviceName)
    .ports.map(p => p.name);

  return (
    <Card className={classNames(classes.card, classes.panel)}>
      <CardContent>
        <Typography variant="overline" align="left" gutterBottom>
          ingress
        </Typography>
        <Grid container spacing={10}>
          <Grid item xs={12}>
            <div className={classes.container}>
              <TextField
                name="host"
                label="Host Fully Qualified Domain Name (FQDN)"
                className={classes.textField}
                value={ingress.host}
                onChange={props.onChange(serviceName, ingress.host)}
                margin="normal"
                required
                fullWidth
                error={hasError(props.specPath, "host")}
              />
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="type">Service / Component Name</InputLabel>
                <Select
                  value={serviceName}
                  onChange={props.onChange(serviceName, ingress.host)}
                  required
                  error={hasError(props.specPath, "serviceName")}
                  inputProps={{
                    name: "serviceName",
                    id: "serviceName"
                  }}
                >
                  {services.map((s, idx) => (
                    <MenuItem key={s.name + "-" + idx} value={s.name}>
                      {s.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="type">Service / Component Port</InputLabel>
                <Select
                  // we only support a single path in the UI right now
                  value={ingress.paths[0].portName}
                  onChange={props.onChange(serviceName, ingress.host)}
                  required
                  error={hasError(props.specPath, "portName")}
                  inputProps={{
                    name: "servicePort",
                    id: "servicePort"
                  }}
                >
                  {servicePorts.map((p, idx) => (
                    <MenuItem key={p + "-" + idx} value={p}>
                      {p}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions className={classes.actions}>
        <IconButton aria-label="add ingress rule" onClick={props.onAdd}>
          <AddCircleIcon />
        </IconButton>
        <IconButton
          className={classes.delete}
          aria-label="delete ingress"
          onClick={props.onDelete(serviceName, ingress.host)}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

IngressPanel.propTypes = {
  ui: PropTypes.object.isRequired,
  specPath: PropTypes.arrayOf(PropTypes.string).isRequired,
  ingress: PropTypes.object.isRequired,
  services: PropTypes.arrayOf(PropTypes.object).isRequired,
  serviceName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
    /* width: 400, */
  },
  formControl: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(2),
    minWidth: 400,
    textAlign: "left"
  },
  actions: {
    display: "flex",
    textAlign: "right"
  },
  delete: {
    marginRight: "auto"
  },
  card: {
    minWidth: 275
  },
  panel: {
    marginBottom: theme.spacing(4)
  }
});

export default withStyles(styles)(IngressPanel);
