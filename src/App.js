import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <div>
          <Button variant="contained" color="primary">
            Kruise
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
