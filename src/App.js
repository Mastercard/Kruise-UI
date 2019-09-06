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
  const [appSpec, setAppSpec] = useState(Store.appSpec);
  const [ui, setUi] = useState(Store.ui);

  return (
    <div>
      <>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Layout
            appSpec={appSpec}
            setAppSpec={setAppSpec}
            ui={ui}
            setUi={setUi}
          />
        </ThemeProvider>
      </>
    </div>
  );
}

export default App;
