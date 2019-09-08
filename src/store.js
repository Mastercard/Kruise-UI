import data from "./spec.json";
import Application from "./components/Application";
import Services from "./components/Services";

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
      { name: "Services", path: "/services", component: Services }
    ]
  }
};
