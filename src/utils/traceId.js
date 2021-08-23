import uuidv4 from 'uuid/dist/v4';
import supportsLocalStorage from 'supports-localstorage';

let traceId = uuidv4();
const TRACEID_KEY = 'traceId';

export function setTraceId(value) {
  if (supportsLocalStorage()) {
    localStorage.setItem(TRACEID_KEY, value);
  }

  traceId = value;

  return value;
}

export function getTraceId() {
  let value = traceId;

  if (supportsLocalStorage()) {
    const localStorageValue = localStorage.getItem(TRACEID_KEY);

    if (localStorageValue) {
      value = localStorageValue;
    }
  }

  return setTraceId(value);
}

export default getTraceId();
