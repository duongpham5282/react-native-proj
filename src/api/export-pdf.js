import config from 'config';
import axios from 'axios';
import traceId from 'utils/traceId';

export const exportPdf = ({ report, type, filters }) =>
  axios(`${config.apiGateway.url}/${report}/report/${type}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Trace-Id': traceId,
    },
    data: JSON.stringify(filters),
  }).then(response => response.data);

export const exportPdfNew = ({ report, type, filters }) =>
  axios(`${config.apiGateway.url}/reports/${report}/${type}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Trace-Id': traceId,
    },
    data: JSON.stringify(filters),
  }).then(response => response.data);
