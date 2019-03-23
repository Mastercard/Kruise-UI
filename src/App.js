import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { HashRouter } from "react-router-dom";
import Layout from './Layout';

const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
  typography: {
    useNextVariants: true,
  },
});

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <div>
          <MuiThemeProvider theme={theme}>
            <HashRouter>
              <Layout />
            </HashRouter>
          </MuiThemeProvider>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
