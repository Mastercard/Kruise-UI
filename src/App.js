import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Layout from './Layout'

const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
});

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <div>
          <MuiThemeProvider theme={theme}>
            <Layout />
          </MuiThemeProvider>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
