import sampleSpec from "./spec.sample.json";
import Application from "./components/Application";
import Services from "./components/Services";
import Ingresses from "./components/Ingresses";
import Volumes from "./components/Volumes";
import Containers from "./components/Containers";
import Release from "./components/Release";

const loadApp = () => {
  if (window.KruiseConfig.UseSampleSpec) {
    return sampleSpec;
  }

  const localApp = localStorage.getItem("application");
  if (localApp !== null) {
    return {
      application: JSON.parse(localStorage.getItem("application"))
    };
  } else {
    return newApp();
  }
};

const saveStore = app => {
  localStorage.setItem("application", JSON.stringify(app));
};

const loadStore = () => {
  return {
    application: loadApp().application,
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
        { name: "Release", path: "/release", component: Release }
      ]
    }
  };
};

const newApp = () => {
  return {
    application: {
      metadata: {
        name: "",
        namespace: "",
        labels: {
          version: "",
          team: "",
          env: window.KruiseConfig.Environments[0],
          region: window.KruiseConfig.Regions[0]
        }
      },
      spec: {
        destination: {
          url: "",
          path: "/",
          targetRevision: "HEAD"
        },
        configMaps: [],
        persistentVolumes: [],
        components: []
      }
    }
  };
};

export { loadStore, saveStore };
