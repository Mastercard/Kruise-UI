import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import update from "immutability-helper";
import Grid from "@material-ui/core/Grid";
import WizardNav from "./WizardNav";
import DialogNoServices from "./DialogNoServices";
import IngressPanel from "./IngressPanel";
import EmptyResourceView from "./EmptyResourceView";
import useApplicationValidator from "../validation";

function Ingresses(props) {
  const { app, setApp, ui, setUi, classes } = props;
  const [, clearError, validate] = useApplicationValidator(ui, setUi);

  const handleSubmit = () => {
    return validate(app);
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

    clearError(
      ["spec", "components", cidx.toString(), "ingresses", iidx.toString()],
      event.target.name
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

  const services = app.spec.components.map(c => c.service);
  if (services.length === 0) {
    return <DialogNoServices resource={"ingress rules"} />;
  }

  const ingressPanels = app.spec.components.map((component, componentIdx) => {
    return component.ingresses.map((ingress, ingressIdx) => {
      return (
        <IngressPanel
          key={"ingress-" + ingressIdx}
          ui={ui}
          specPath={[
            "spec",
            "components",
            componentIdx.toString(),
            "ingresses",
            ingressIdx.toString()
          ]}
          ingress={ingress}
          serviceName={component.service.name}
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
          <WizardNav onSubmit={handleSubmit} routes={ui.routes} />
        </Grid>
      </Grid>
    );
  } else {
    view = (
      <EmptyResourceView
        ui={ui}
        name="Ingress"
        onSubmit={handleSubmit}
        onAdd={addIngress}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <div className={classes.root}>{view}</div>
    </form>
  );
}

Ingresses.propTypes = {
  app: PropTypes.object.isRequired,
  setApp: PropTypes.func.isRequired,
  ui: PropTypes.object.isRequired,
  setUi: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const styles = {
  root: {
    display: "flex"
  }
};

export default withStyles(styles)(Ingresses);
