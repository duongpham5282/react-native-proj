export function requestAuthMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    // const { type, payload } = action;
    // const notAuthorized = type.indexOf('FAIL') !== -1 && payload && payload.status === 401;
    // if (notAuthorized) {
    //     window.location.href = ROUTES.LOGIN;
    // }
    return next(action);
  };
}
