import React, { useState } from "react";
import { Store } from "./store";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Layout from "./components/Layout";

const theme = createMuiTheme({
  palette: {
    type: "light"
  },
  typography: {
    useNextVariants: true
  }
});

function App() {
  const [app, setApp] = useState(Store.application);
  const [services, setServices] = useState(Store.services);

  return (
    <div>
      <>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Layout
            app={app}
            setApp={setApp}
            services={services}
            setServices={setServices}
          />
        </ThemeProvider>
      </>
    </div>
  );
}

export default App;
