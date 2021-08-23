import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'store/sagas';
import { checklistsReducer, checkListsInitialState } from 'reducers/checklists';
import { baseReducer, baseInitialState } from 'reducers/base';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { exportPdfReducer, exportPdfInitialState } from 'reducers/export-pdf';

const appState = {
  checklists: checkListsInitialState,
  base: baseInitialState,
  exportPdf: exportPdfInitialState,
};

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['localizations'],
};

const sagaMiddleware = createSagaMiddleware();

function configureStore(initialState) {
  const persistedRootReducer = persistReducer(
    persistConfig,
    combineReducers({
      errorHandler: httpErrorReducer,
      checklists: checklistsReducer,
      base: baseReducer,
      xlsxImported: importChecklistsReducer,
      searchCriteria: searchCriteriaReducer,
      exportPdf: exportPdfReducer,
    }),
  );

  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  let composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;
  composeEnhancers = process.env.REACT_APP_STAGE === 'prod' ? compose : composeEnhancers;

  const store = createStore(
    persistedRootReducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware, requestAuthMiddleware())),
  );

  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  return { store, persistor };
}

export default configureStore(appState);
