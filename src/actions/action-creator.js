export const SUCCESS = 'SUCCESS';
export const FAIL = 'FAIL';

export const action = name => ({
  name,
  request: (payload = {}) => ({
    type: name,
    payload,
  }),
  success: (payload = {}) => ({
    type: `${name}_${SUCCESS}`,
    payload,
  }),
  failed: (payload = {}) => ({
    type: `${name}_${FAIL}`,
    payload,
  }),
});
