import React from "react";
import PropTypes from "prop-types";

function Debug(props) {
  return (
    <>
      <h2>application</h2>
      <p>
        <strong>Name:</strong> {props.app.name}
      </p>
      <p>
        <strong>Namespace:</strong> {props.app.namespace}
      </p>
      <p>
        <strong>Version:</strong> {props.app.labels.version}
      </p>
      <p>
        <strong>Team:</strong> {props.app.labels.team}
      </p>
      <p>
        <strong>Env:</strong> {props.app.labels.env}
      </p>
      <p>
        <strong>Region:</strong> {props.app.labels.region}
      </p>
    </>
  );
}

Debug.propTypes = {
  app: PropTypes.object,
  setApp: PropTypes.func
};

export default Debug;
