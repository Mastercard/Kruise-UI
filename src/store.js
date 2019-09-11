import data from "./spec.json";
import Application from "./components/Application";
import Services from "./components/Services";
import Ingresses from "./components/Ingresses";
import Volumes from "./components/Volumes";
import Containers from "./components/Containers";

export const Store = {
  application: data.application,
  ui: {
    warning: null,
    error: null,
    validationErrors: {},
    showPreview: false,
    previewEnabled: false,
    previewContent: "",
    routes: [
      { name: "Application", path: "/", component: Application },
      { name: "Services", path: "/services", component: Services },
      { name: "Ingresses", path: "/ingresses", component: Ingresses },
      { name: "Volumes", path: "/volumes", component: Volumes },
      { name: "Containers", path: "/containers", component: Containers },
    ]
  }
};
