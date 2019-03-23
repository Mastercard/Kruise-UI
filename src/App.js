import React, { Component } from 'react';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { HashRouter } from "react-router-dom";
import Layout from './Layout';
import store from './store/index'

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
      <Provider store={store}>
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
      </Provider>
    );
  }
}

export default App;
