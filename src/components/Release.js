import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import releaseApplication from "../release";

function Release(props) {
  const { app, ui, setUi, classes } = props;

  const [showStatus, setShowStatus] = useState(false);
  const [messages, setMessages] = useState([]);
  const release = releaseApplication(ui, setUi);

  const handleReleaseClick = async event => {
    if (event) event.preventDefault();
    let msgs = messages.slice();
    msgs = msgs.concat("Creating release...");
    setMessages(msgs);
    setShowStatus(true);
    if (await release(app)) {
      msgs = msgs.concat(
        "Release done",
        `Published to ${app.spec.destination.url} @ ${app.spec.destination.path}`,
        `Revision: ${app.spec.destination.targetRevision}`
      );
      setMessages(msgs);
    }
  };

  const displayMessages = messages.map(m => {
    return (
      <Typography key={m} variant="body2" color="textSecondary" component="p">
        {m}
      </Typography>
    );
  });

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Card className={classNames(classes.card, classes.panel)}>
            <CardContent>
              <Typography variant="overline" align="left" gutterBottom>
                Analysis
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                OK. TODO: Analyze app for any problems
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={handleReleaseClick}
              >
                Release
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4}>
          {showStatus && (
            <Card className={classNames(classes.card, classes.panel)}>
              <CardContent>
                <Typography variant="overline" align="left" gutterBottom>
                  Status
                </Typography>
                <>{displayMessages}</>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

Release.propTypes = {
  app: PropTypes.object.isRequired,
  setApp: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
  setUi: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
  root: {
    display: "flex"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  button: {
    marginRight: theme.spacing(1)
  }
});

export default withStyles(styles)(Release);
