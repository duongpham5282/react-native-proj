import { call, fork } from 'redux-saga/effects';

import { getAllCountries } from 'store/saga/countries';

export const MAX_API_RETRY = 3;

export default function* rootSaga() {

  yield fork(getAllCountries);

}
