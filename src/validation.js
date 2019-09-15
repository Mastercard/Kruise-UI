import update from "immutability-helper";
import Config from "./config";

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

  const checkResponse = response => {
    if (!response.ok) {
      throw new Error(`${response.statusText} (${response.status})`);
    }
    return response;
  };

  const validate = async app => {
    return fetch(`${Config.KruiseAPI}/app/validation`, {
      method: "post",
      body: JSON.stringify(app),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(checkResponse)
      .then(response =>
        response.json().then(verrs => {
          if (Object.keys(verrs).length > 0) {
            setUi({ ...ui, validationErrors: verrs });
            return false;
          }
          return true;
        })
      )
      .catch(error => {
        setUi({
          ...ui,
          error: `Validation failed: ${error.message}`
        });
        return false;
      });
  };

  return [hasError, clearError, validate];
}
