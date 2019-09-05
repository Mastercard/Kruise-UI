import React, { useState } from "react";
import PropTypes from "prop-types";

function Services(props) {
  const [services] = useState(props.services);

  return services.map((s, idx) => (
    <h1 key={"service-" + idx}>{s.spec.service.type}</h1>
  ));
}

Services.propTypes = {
  services: PropTypes.arrayOf(PropTypes.object)
};

export default Services;
