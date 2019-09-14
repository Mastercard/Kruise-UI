import update from "immutability-helper";

export default function useApplicationValidator(ui, setUi) {
  const hasError = (path, field) => {
    const appErrors = path.reduce(
      (acc, p) => ((acc && acc[p]) !== undefined ? acc[p] : undefined),
      ui.validationErrors.errors || {}
    );
    return Object.prototype.hasOwnProperty.call(appErrors || {}, field);
  };

  const clearError = (path, field) => {
    if (!hasError(path, field)) return;
    let patch = {};
    path.reduce((acc, p, i, src) => {
      if (i === src.length - 1) {
        return (acc[p] = { $unset: [field] });
      }
      return (acc[p] = {});
    }, patch);
    setUi(
      update(ui, {
        validationErrors: {
          errors: patch
        }
      })
    );
  };

  const validate = async app => {
    return fetch("http://localhost:9801/app/validation", {
      method: "post",
      body: JSON.stringify(app),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response =>
      response.json().then(verrs => {
        if (Object.keys(verrs).length > 0) {
          setUi({ ...ui, validationErrors: verrs });
          return false;
        }
        return true;
      })
    );
  };

  return [validate, hasError, clearError];
}
