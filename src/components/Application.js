import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import update from "immutability-helper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import WizardNav from "./WizardNav";
import useApplicationValidator from "../validation";

function Application(props) {
  const { app, setApp, ui, setUi, classes } = props;
  const { Environments, Regions } = window.KruiseConfig;
  const metadata = app.metadata;
  const labels = metadata.labels;
  const destination = app.spec.destination;
  const [hasError, clearError, validate] = useApplicationValidator(ui, setUi);

  const handleMetadataChange = event => {
    setApp(
      update(app, {
        metadata: {
          [event.target.name]: { $set: event.target.value }
        }
      })
    );
    clearError(["metadata"], event.target.name);
  };

  const handleLabelsChange = event => {
    setApp(
      update(app, {
        metadata: {
          labels: {
            [event.target.name]: { $set: event.target.value }
          }
        }
      })
    );
    clearError(["metadata", "labels"], event.target.name);
  };

  const handleDestinationChange = event => {
    setApp(
      update(app, {
        spec: {
          destination: {
            [event.target.name]: { $set: event.target.value }
          }
        }
      })
    );
    clearError(["spec", "destination"], event.target.name);
  };

  const handleSubmit = () => {
    return validate(app, ["metadata"]);
  };

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <div className={classes.root}>
        <Grid container spacing={10}>
          <Grid item xs={5}>
            <Paper className={classes.paper}>
              <Typography variant="overline" align="left" gutterBottom>
                application details
              </Typography>
              <div className={classes.container}>
                <TextField
                  name="name"
                  label="Application Name"
                  className={classes.textField}
                  value={metadata.name}
                  onChange={handleMetadataChange}
                  margin="normal"
                  required
                  error={hasError(["metadata"], "name")}
                />
                <TextField
                  name="version"
                  label="Release / Version"
                  className={classes.textField}
                  value={labels.version}
                  onChange={handleLabelsChange}
                  margin="normal"
                  required
                  error={hasError(["metadata", "labels"], "version")}
                />
                <TextField
                  name="team"
                  label="Team Organization"
                  className={classes.textField}
                  value={labels.team}
                  onChange={handleLabelsChange}
                  margin="normal"
                  required
                  error={hasError(["metadata", "labels"], "team")}
                />
                <FormControl
                  className={classes.formControl}
                  error={hasError(["metadata", "labels"], "env")}
                >
                  <InputLabel htmlFor="environment">
                    Target Environment
                  </InputLabel>
                  <Select
                    value={labels.env}
                    required
                    onChange={handleLabelsChange}
                    error={hasError(["metadata", "labels"], "env")}
                    inputProps={{
                      name: "env",
                      id: "env"
                    }}
                  >
                    {Environments.map(e => (
                      <MenuItem key={e} value={e}>
                        {e}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl
                  className={classes.formControl}
                  error={hasError(["metadata", "labels"], "region")}
                >
                  <InputLabel htmlFor="environment">Target Region</InputLabel>
                  <Select
                    value={labels.region}
                    required
                    onChange={handleLabelsChange}
                    inputProps={{
                      name: "region",
                      id: "region"
                    }}
                  >
                    {Regions.map(e => (
                      <MenuItem key={e} value={e}>
                        {e}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  name="namespace"
                  label="Target Namespace"
                  className={classes.textField}
                  value={metadata.namespace}
                  onChange={handleMetadataChange}
                  margin="normal"
                  required
                  error={hasError(["metadata"], "namespace")}
                />
              </div>
            </Paper>
          </Grid>
          <Grid item xs={5}>
            <Paper className={classes.paper}>
              <Typography variant="overline" align="left" gutterBottom>
                repository settings
              </Typography>
              <div className={classes.container}>
                {/* TODO: validate that this is a url (the server does currently) */}
                <TextField
                  name="url"
                  label="Deployment Git Repo URL"
                  className={classes.textField}
                  value={destination.url}
                  onChange={handleDestinationChange}
                  margin="normal"
                  required
                  error={hasError(["spec", "destination"], "url")}
                />
                <TextField
                  name="path"
                  label="Deployment Git Path"
                  className={classes.textField}
                  value={destination.path}
                  onChange={handleDestinationChange}
                  margin="normal"
                  required
                  error={hasError(["spec", "destination"], "path")}
                />
                <TextField
                  name="targetRevision"
                  label="Deployment Git Revision"
                  className={classes.textField}
                  value={destination.targetRevision}
                  onChange={handleDestinationChange}
                  margin="normal"
                  required
                  error={hasError(["spec", "destination"], "targetRevision")}
                />
              </div>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <WizardNav onSubmit={handleSubmit} routes={ui.routes} />
          </Grid>
        </Grid>
      </div>
    </form>
  );
}

Application.propTypes = {
  app: PropTypes.object.isRequired,
  setApp: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
  setUi: PropTypes.func.isRequired,
  onChange: PropTypes.func,
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
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400
  },
  formControl: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(2),
    minWidth: 400,
    textAlign: "left"
  },
  button: {
    marginRight: theme.spacing(1)
  }
});

export default withStyles(styles)(Application);
