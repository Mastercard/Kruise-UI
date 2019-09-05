import React, { useState } from "react";
import { Store } from "./store";
import Application from "./components/Application";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { blue, indigo } from "@material-ui/core/colors";

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
  const [services] = useState(Store.services);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Application app={app} onChange={setApp} />
        <AppDetails app={app} />
        {services.map((s, i) => (
          <ServicePlaceholder key={i} spec={s.spec} />
        ))}
      </ThemeProvider>
    </div>
  );
}

function ServicePlaceholder(props) {
  const { service } = props.spec;
  return <h1>Service {service.type}</h1>;
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

export default App;
