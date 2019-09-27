import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";

function PreviewDialog(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      scroll="paper"
      fullWidth
      maxWidth="lg"
      aria-labelledby="preview-dialog-title"
    >
      <DialogTitle id="preview-dialog-title">
        Kubernetes API Manifests
      </DialogTitle>
      <DialogContent>
        <SyntaxHighlighter language="yaml" style={github}>
          {props.content}
        </SyntaxHighlighter>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(props.content);
          }}
          color="secondary"
        >
          Copy
        </Button>
        <Button onClick={props.onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

PreviewDialog.propTypes = {
  content: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func
};

export default PreviewDialog;
