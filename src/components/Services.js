import React from "react";
import PropTypes from "prop-types";

function Services(props) {
  const { services } = props.appSpec;

  return services.map((s, idx) => (
    <h1 key={"service-" + idx}>{s.spec.service.type}</h1>
  ));
}

Services.propTypes = {
  appSpec: PropTypes.object.isRequired
};

export default Services;
