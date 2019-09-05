import React, { useState } from "react";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";

function Application(props) {
  const [app, setApp] = useState(props.app);
  const [labels, setLabels] = useState(props.app.labels);

  const handleAppChange = event => {
    setApp({
      ...app,
      [event.target.name]: event.target.value
    });
  };

  const handleLabelsChange = event => {
    setLabels({
      ...labels,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.onChange({
      ...app,
      labels: labels
    });
    navigate("/services");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>
        {app.name} ({labels.version})
      </h1>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={app.name}
          onChange={handleAppChange}
        />
      </label>
      <label>
        Namespace:
        <input
          type="text"
          name="namespace"
          value={app.namespace}
          onChange={handleAppChange}
        />
      </label>
      <label>
        Version:
        <input
          type="text"
          name="version"
          value={labels.version}
          onChange={handleLabelsChange}
        />
      </label>
      <label>
        Team:
        <input
          type="text"
          name="team"
          value={labels.team}
          onChange={handleLabelsChange}
        />
      </label>
      <label>
        Env:
        <input
          type="text"
          name="env"
          value={labels.env}
          onChange={handleLabelsChange}
        />
      </label>
      <label>
        Region:
        <input
          type="text"
          name="region"
          value={labels.region}
          onChange={handleLabelsChange}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

Application.propTypes = {
  app: PropTypes.object,
  onChange: PropTypes.func
};

export default Application;
