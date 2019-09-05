import React, { useState } from "react";
import { Store } from "./store";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { blue, indigo } from "@material-ui/core/colors";
import Routes from "./routes";
import PropTypes from "prop-types";

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: blue[900]
    },
    primary: {
      main: indigo[700]
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: ['"Lato"', "sans-serif"].join(",")
  }
});

function App() {
  const [app, setApp] = useState(Store.application);
  const [services, setServices] = useState(Store.services);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Routes
          app={app}
          setApp={setApp}
          services={services}
          setServices={setServices}
        />
        <AppDetails app={app} />
      </ThemeProvider>
    </div>
  );
}

function AppDetails(props) {
  return (
    <>
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

AppDetails.propTypes = {
  app: PropTypes.object,
  setApp: PropTypes.func
};

export default App;
