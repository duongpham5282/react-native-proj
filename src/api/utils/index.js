import traceId from 'utils/traceId';

export const requestOptionsGET = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Trace-Id': traceId,
  },
};
