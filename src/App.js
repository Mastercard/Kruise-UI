import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

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
            <Typography component="h2" variant="h1" gutterBottom>
              Kruise
            </Typography>
          </MuiThemeProvider>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
