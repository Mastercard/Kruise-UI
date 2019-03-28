import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';

class PreviewDialog extends Component {
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        scroll="paper"
        fullWidth
        maxWidth="lg"
        aria-labelledby="preview-dialog-title"
      >
        <DialogTitle id="preview-dialog-title">Kubernetes API Manifests</DialogTitle>
          <DialogContent>
            <SyntaxHighlighter language="yaml" style={github}>
              {this.props.content}
            </SyntaxHighlighter>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
    );
  }
}

export default PreviewDialog;
