import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

function Debug(props) {
  const { app } = props;
  const metadata = app.metadata;
  const labels = metadata.labels;
  const destination = app.spec.destination;
  const services = app.spec.components.map(c => c.service);
  const servicePorts = services.reduce((o, s) => {
    return Object.assign(o, {
      [s.name]: s.ports.map((p, i) => {
        return (
          <div key={i}>
            <strong>
              {p.name} ({p.port}:{p.targetPort})
            </strong>
          </div>
        );
      })
    });
  }, {});

  const serviceIngresses = app.spec.components.reduce((o, c) => {
    return Object.assign(o, {
      [c.service.name]: c.ingresses.map((i, j) => {
        return (
          <div key={j}>
            <strong>Ingress: </strong>
            {i.host} ({i.paths[0].portName})
          </div>
        );
      })
    });
  }, {});

  return (
    <Grid container spacing={10}>
      <Grid item xs={4}>
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
      <Grid item xs={4}>
        <h2>services</h2>
        {services.map((s, i) => (
          <div key={i}>
            <strong>Name:</strong> {s.name}
            <br />
            <strong>Type:</strong> {s.type}
            <br />
            {servicePorts[s.name]}
            {serviceIngresses[s.name]}
            <br />
          </div>
        ))}
      </Grid>
      <Grid item xs={4}>
        <h2>configMaps</h2>
        {app.spec.configMaps.map((c, i) => (
          <div key={i}>
            <strong>Name:</strong> {c.name}
            <br />
            <strong>Data size:</strong> {c.data.length}
            <br />
          </div>
        ))}
        <h2>persistentVolumes</h2>
        {app.spec.persistentVolumes.map((v, i) => (
          <div key={i}>
            <strong>Name:</strong> {v.name}
            <br />
            <strong>Access Mode:</strong> {v.accessMode}
            <br />
            <strong>Capacity:</strong> {v.capacity}
            <br />
            <strong>Storage Class:</strong> {v.storageClassName}
            <br />
          </div>
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
