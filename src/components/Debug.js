import React from "react";
import PropTypes from "prop-types";

function Debug(props) {
  const app = props.appSpec.application;
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
    </>
  );
}

Debug.propTypes = {
  appSpec: PropTypes.object,
  setAppSpec: PropTypes.func
};

export default Debug;
