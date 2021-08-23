import * as actionTypes from 'constants/errors';

const execute404Handler = props => {
  return {
    type: actionTypes.HTTP_404_ERROR,
    props: props,
  };
};

const execute403Handler = props => {
  return {
    type: actionTypes.HTTP_403_ERROR,
    props: props,
  };
};

const execute401Handler = props => {
  return {
    type: actionTypes.HTTP_401_ERROR,
    props: props,
  };
};

const execute500Handler = props => {
  return {
    type: actionTypes.HTTP_500_ERROR,
    props: props,
  };
};

const executeOtherErrorHandler = error => {
  return {
    type: actionTypes.HTTP_OTHER_ERROR,
    error: error,
  };
};

export const handleHTTPError = (error, props) => {
  if (error.status === 404) {
    return execute404Handler(props);
  }
  if (error.status === 401) {
    return execute401Handler(props);
  }
  if (error.status === 403) {
    return execute403Handler(props);
  } else if (error.status === 500) {
    return execute500Handler(props);
  } else {
    return executeOtherErrorHandler(error);
  }
};
