const releaseApplication = (ui, setUi) => async app => {
  return fetch(`${window.KruiseConfig.API}/app/release`, {
    method: "post",
    body: JSON.stringify(app),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(checkResponse)
    .then(response =>
      response.json().then(() => {
        return true;
      })
    )
    .catch(error => {
      setUi({
        ...ui,
        error: `Release failed: ${error.message}`
      });
      return false;
    });
};

const checkResponse = response => {
  if (!response.ok) {
    throw new Error(`${response.statusText} (${response.status})`);
  }
  return response;
};

export default releaseApplication;
