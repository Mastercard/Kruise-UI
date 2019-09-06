import React from "react";
import { Router } from "@reach/router";
import PropTypes from "prop-types";

export default function Routes(props) {
  // TODO: not sure this is in the right place
  const changeAppSpec = change => {
    props.setAppSpec({
      ...props.appSpec,
      ...change
    });
  };

  return (
    <Router>
      {props.routes.map(r => {
        const Tag = r.component;
        return (
          <Tag
            key={r.path}
            path={r.path}
            appSpec={props.appSpec}
            onChange={changeAppSpec}
          />
        );
      })}
    </Router>
  );
}

Routes.propTypes = {
  appSpec: PropTypes.object,
  setAppSpec: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  services: PropTypes.arrayOf(PropTypes.object)
};
