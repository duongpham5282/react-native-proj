import { call, put, takeEvery } from 'redux-saga/effects';
import { exportPdf as getPdfFile, exportPdfNew as getPdfFileNew } from 'api/export-pdf';
import actions, { EXPORT_PDF_ACTION_TYPE } from 'actions/export-pdf';

/**
 * XLSX import-checklists sagas
 */

export function* exportPdfSaga({ payload: { report, type, filters } }) {
  try {
    if (report === 'checklists') {
      const response = yield call(getPdfFile, { report, type, filters });
      yield put(actions.success(response));
    } else {
      const response = yield call(getPdfFileNew, { report, type, filters });
      yield put(actions.success(response));
    }
  } catch (error) {
    yield put(actions.failed(error));
  }
}

export function* exportPdf() {
  yield takeEvery(EXPORT_PDF_ACTION_TYPE, exportPdfSaga);
}
