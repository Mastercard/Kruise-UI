import React from "react";
import { Router } from "@reach/router";
import Application from "./components/Application";
import PropTypes from "prop-types";

export default function Routes(props) {
  return (
    <Router>
      <Application app={props.app} onChange={props.setApp} path="/" />
    </Router>
  );
}

Routes.propTypes = {
  app: PropTypes.object,
  setApp: PropTypes.func
};
