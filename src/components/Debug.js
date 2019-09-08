import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

function Debug(props) {
  const { app } = props;
  const metadata = app.metadata;
  const labels = metadata.labels;
  const destination = app.spec.destination;
  const services = app.spec.components.map(c => c.service);
  return (
    <Grid container spacing={10}>
      <Grid item xs={6}>
        <h2>application</h2>
        <p>
          <strong>Name:</strong> {metadata.name}
          <br />
          <strong>Namespace:</strong> {metadata.namespace}
          <br />
          <strong>Version:</strong> {labels.version}
          <br />
          <strong>Team:</strong> {labels.team}
          <br />
          <strong>Env:</strong> {labels.env}
          <br />
          <strong>Region:</strong> {labels.region}
        </p>
        <h2>destination</h2>
        <p>
          <strong>Url:</strong> {destination.url}
          <br />
          <strong>Path:</strong> {destination.path}
          <br />
          <strong>TargetRevision:</strong> {destination.targetRevision}
        </p>
      </Grid>
      <Grid item xs={6}>
        <h2>services</h2>
        {services.map((s, i) => (
          <p key={i}>
            <strong>Name:</strong> {s.name}
            <br />
            <strong>Type:</strong> {s.type}
            <br />
          </p>
        ))}
      </Grid>
    </Grid>
  );
}

Debug.propTypes = {
  app: PropTypes.object,
  setApp: PropTypes.func
};

export default Debug;
