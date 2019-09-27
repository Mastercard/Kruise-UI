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
            setUi={props.setUi}
            app={props.app}
            setApp={props.setApp}
          />
        );
      })}
    </Router>
  );
}

Routes.propTypes = {
  app: PropTypes.object.isRequired,
  setApp: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
  setUi: PropTypes.func.isRequired
};
