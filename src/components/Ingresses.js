import React from "react";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";
import { withStyles } from "@material-ui/core/styles";
import update from "immutability-helper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import WizardNav from "./WizardNav";
import DialogNoServices from "./DialogNoServices";
import IngressPanel from "./IngressPanel";

function Ingresses(props) {
  const handleSubmit = event => {
    if (event) event.preventDefault();
    navigate("/volumes");
  };

  const addIngress = () => {
    setApp(
      update(app, {
        spec: {
          components: {
            0: {
              ingresses: {
                $push: [
                  {
                    host: "",
                    paths: [
                      {
                        path: "/",
                        portName: app.spec.components[0].service.ports[0].name
                      }
                    ]
                  }
                ]
              }
            }
          }
        }
      })
    );
  };

  const deleteIngress = (serviceName, host) => () => {
    const cidx = app.spec.components.findIndex(
      c => c.service.name === serviceName
    );

    const iidx = app.spec.components[cidx].ingresses.findIndex(
      i => i.host === host
    );

    setApp(
      update(app, {
        spec: {
          components: {
            [cidx]: {
              ingresses: {
                $splice: [[iidx, 1]]
              }
            }
          }
        }
      })
    );
  };

  const changeIngress = (serviceName, host) => event => {
    const cidx = app.spec.components.findIndex(
      c => c.service.name === serviceName
    );

    const iidx = app.spec.components[cidx].ingresses.findIndex(
      i => i.host === host
    );

    switch (event.target.name) {
      case "serviceName":
        var newServiceName = event.target.value;
        if (newServiceName === serviceName) {
          return;
        }

        var newCidx = app.spec.components.findIndex(
          c => c.service.name === newServiceName
        );

        // store ingress
        var ingress = app.spec.components[cidx].ingresses[iidx];
        //
        // remove ingress from existing service
        var newApp = update(app, {
          spec: {
            components: {
              [cidx]: {
                ingresses: {
                  $splice: [[iidx, 1]]
                }
              }
            }
          }
        });

        ingress = update(ingress, {
          paths: {
            0: {
              $set: {
                portName: app.spec.components[newCidx].service.ports[0].name
              }
            }
          }
        });

        // add copy to new service
        newApp = update(newApp, {
          spec: {
            components: {
              [newCidx]: {
                ingresses: {
                  $push: [ingress]
                }
              }
            }
          }
        });

        // update app
        setApp(newApp);
        break;
      case "servicePort":
        setApp(
          update(app, {
            spec: {
              components: {
                [cidx]: {
                  ingresses: {
                    [iidx]: {
                      paths: {
                        0: {
                          $merge: {
                            portName: event.target.value
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          })
        );
        break;
      default:
        setApp(
          update(app, {
            spec: {
              components: {
                [cidx]: {
                  ingresses: {
                    [iidx]: {
                      $merge: {
                        [event.target.name]: event.target.value
                      }
                    }
                  }
                }
              }
            }
          })
        );
    }
  };

  const { app, setApp, ui, classes } = props;
  const services = app.spec.components.map(c => c.service);
  if (services.length === 0) {
    return <DialogNoServices resource={"ingress rules"} />;
  }

  const ingresses = app.spec.components.reduce((o, component) => {
    return Object.assign(o, { [component.service.name]: component.ingresses });
  }, {});

  const ingressPanels = Object.keys(ingresses).map(serviceName => {
    return ingresses[serviceName].map((ingress, ingressIdx) => {
      return (
        <IngressPanel
          key={"ingress-" + ingressIdx}
          ui={ui}
          ingress={ingress}
          serviceName={serviceName}
          services={services}
          onAdd={addIngress}
          onChange={changeIngress}
          onDelete={deleteIngress}
        />
      );
    });
  });

  const ingressPanelCount = ingressPanels.reduce(
    (count, p) => count + p.length,
    0
  );

  let view;
  if (ingressPanelCount > 0) {
    view = (
      <Grid container spacing={10}>
        <Grid item xs={10}>
          {ingressPanels}
        </Grid>
        <Grid item xs={2}>
          <WizardNav routes={ui.routes} />
        </Grid>
      </Grid>
    );
  } else {
    view = <NoIngressesView ui={ui} classes={classes} onAdd={addIngress} />;
  }

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <div className={classes.root}>{view}</div>
    </form>
  );
}

function NoIngressesView(props) {
  const { ui, classes, onAdd } = props;

  return (
    <Grid container spacing={10}>
      <Grid item xs={2} />
      <Grid item xs={8}>
        <div className={classes.actionRow}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={onAdd}
          >
            Add Ingress
            <AddCircleIcon className={classes.rightIcon} />
          </Button>
        </div>
      </Grid>
      <Grid item xs={2}>
        <WizardNav routes={ui.routes} />
      </Grid>
    </Grid>
  );
}

Ingresses.propTypes = {
  app: PropTypes.object.isRequired,
  setApp: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

NoIngressesView.propTypes = {
  ui: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired
};

const styles = theme => ({
  root: {
    display: "flex"
  },
  button: {
    marginRight: theme.spacing(10)
  },
  rightIcon: {
    marginLeft: theme.spacing(10)
  },
  actionRow: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    textAlign: "center"
  }
});

export default withStyles(styles)(Ingresses);
