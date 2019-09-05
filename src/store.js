import data from "./spec.json";
import Application from "./components/Application";
import Services from "./components/Services";

export const Store = {
  application: data.application,
  services: data.services,
  ui: {
    warning: null,
    error: null,
    step: "",
    validationErrors: {},
    showPreview: false,
    previewEnabled: false,
    previewContent: "",
    routes: [
      { name: "App Details", path: "/", component: Application },
      { name: "Services", path: "/services", component: Services }
    ]
  }
};
