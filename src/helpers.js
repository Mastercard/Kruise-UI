const routeIndex = (routes, path) => {
  let idx = -1;
  routes.forEach(function (r, i) {
    if (r.path === path) {
      idx = i;
      return;
    }
  });
  return idx;
};

const nextRoute = (routes, location) => {
  let next = routeIndex(routes, location.pathname) + 1;
  if (next > routes.length - 1) {
    // at the end of the step routes. return current location
    return location.pathname;
  }
  return routes[next].path;
};

const prevRoute = (routes, location) => {
  let prevIdx = routeIndex(routes, location.pathname) - 1;
  if (prevIdx >= 0) {
    return routes[prevIdx].path;
  }
  return null;
};

export {
  nextRoute,
  prevRoute,
};
