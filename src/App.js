import React from "react";
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
  return (
    <div>
      <>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Layout />
        </ThemeProvider>
      </>
    </div>
  );
}

export default App;
