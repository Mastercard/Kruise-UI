import React from "react";
import { Router } from "@reach/router";
import PropTypes from "prop-types";

export default function Routes(props) {
  return (
    <Router>
      {props.ui.routes.map(r => {
        const Tag = r.component;
        return (
          <Tag
            key={r.path}
            path={r.path}
            ui={props.ui}
            appSpec={props.appSpec}
            setAppSpec={props.setAppSpec}
          />
        );
      })}
    </Router>
  );
}

Routes.propTypes = {
  appSpec: PropTypes.object.isRequired,
  setAppSpec: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired
};
