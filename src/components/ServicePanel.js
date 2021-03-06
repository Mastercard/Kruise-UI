import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import update from "immutability-helper";
import ServicePortPanel from "./ServicePortPanel";
import useApplicationValidator from "../validation";

// TODO: review these types
const serviceTypes = ["ClusterIP", "ExternalName", "LoadBalancer"];

function ServicePanel(props) {
  const { ui, setUi, service, classes } = props;
  const [hasError, clearError] = useApplicationValidator(ui, setUi);

  const handleChange = event => {
    props.onChange({
      ...service,
      [event.target.name]: event.target.value
    });
    clearError(props.specPath, event.target.name);
  };

  const handlePortChange = idx => event => {
    const { name, value } = event.target;
    let setVal = value;
    if (["port", "targetPort"].includes(name)) {
      if (value === "") setVal = 0;
      else setVal = parseInt(setVal);
    }
    props.onChange(
      update(service, {
        ports: {
          [idx]: {
            $merge: {
              [name]: setVal
            }
          }
        }
      })
    );
    clearError(props.specPath.concat("ports", idx), event.target.name);
  };

  const handlePortDelete = idx => () => {
    props.onChange(
      update(service, {
        ports: {
          $splice: [[idx, 1]]
        }
      })
    );
  };

  const handlePortAdd = () => {
    props.onChange(
      update(service, {
        ports: {
          $push: [
            {
              name: "",
              port: 8080,
              targetPort: ""
            }
          ]
        }
      })
    );
  };

  return (
    <Card className={classNames(classes.card, classes.panel)}>
      <CardContent>
        <Typography variant="overline" align="left" gutterBottom>
          service
        </Typography>
        <Grid container spacing={10}>
          <Grid item xs={6}>
            <div className={classes.container}>
              <TextField
                name="name"
                label="Service / Component Name"
                className={classes.textField}
                value={service.name}
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                error={hasError(props.specPath, "name")}
              />
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="type">Service Type</InputLabel>
                <Select
                  value={service.type}
                  onChange={handleChange}
                  required
                  fullWidth
                  error={hasError(props.specPath, "type")}
                  inputProps={{
                    name: "type",
                    id: "type"
                  }}
                >
                  {serviceTypes.map(s => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={6}>
            {service.ports.map((port, idx) => (
              <ServicePortPanel
                key={"service-port-" + idx}
                ui={ui}
                setUi={setUi}
                specPath={props.specPath.concat("ports", idx.toString())}
                servicePort={port}
                onChange={handlePortChange(idx)}
                onDelete={handlePortDelete(idx)}
              />
            ))}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions className={classes.actions}>
        <IconButton
          className={classes.addService}
          aria-label="add service"
          onClick={props.onAdd}
        >
          <AddCircleIcon />
        </IconButton>
        <IconButton
          className={classes.deleteService}
          aria-label="delete service"
          onClick={props.onDelete}
        >
          <DeleteIcon />
        </IconButton>
        <Button
          variant="contained"
          size="small"
          color="primary"
          className={classes.button}
          onClick={handlePortAdd}
        >
          Add Port
          <AddCircleIcon className={classes.rightIcon} />
        </Button>
      </CardActions>
    </Card>
  );
}

ServicePanel.propTypes = {
  ui: PropTypes.object.isRequired,
  setUi: PropTypes.func.isRequired,
  specPath: PropTypes.arrayOf(PropTypes.string).isRequired,
  service: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
  root: {
    display: "flex"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  button: {
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
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
  deletePort: {
    marginLeft: "auto"
  },
  deleteService: {
    marginRight: "auto"
  },
  card: {
    minWidth: 275
  },
  panel: {
    marginBottom: theme.spacing(4)
  }
});

export default withStyles(styles)(ServicePanel);
