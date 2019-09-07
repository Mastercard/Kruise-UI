import React from "react";
import PropTypes from "prop-types";

function Debug(props) {
  const app = props.appSpec.application;
  const destination = props.appSpec.destination;
  return (
    <>
      <h2>application</h2>
      <p>
        <strong>Name:</strong> {app.name}
      </p>
      <p>
        <strong>Namespace:</strong> {app.namespace}
      </p>
      <p>
        <strong>Version:</strong> {app.labels.version}
      </p>
      <p>
        <strong>Team:</strong> {app.labels.team}
      </p>
      <p>
        <strong>Env:</strong> {app.labels.env}
      </p>
      <p>
        <strong>Region:</strong> {app.labels.region}
      </p>
      <h2>destination</h2>
      <p>
        <strong>Url:</strong> {destination.url}
      </p>
      <p>
        <strong>Path:</strong> {destination.path}
      </p>
      <p>
        <strong>TargetRevision:</strong> {destination.targetRevision}
      </p>
    </>
  );
}

Debug.propTypes = {
  appSpec: PropTypes.object,
  setAppSpec: PropTypes.func
};

export default Debug;
