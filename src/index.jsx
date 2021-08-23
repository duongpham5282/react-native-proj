import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { LayoutProvider } from 'context/layout-context';
import { CookiesProvider } from 'react-cookie';
import { PersistGate } from 'redux-persist/integration/react';
import persistedStore from 'store/store';
import { setAxiosToken } from 'api/auth';

import 'core-js/features/url';
import 'core-js/features/url-search-params';

import { initAnalytics } from 'utils/analytics';
import { useSelector } from 'react-redux';

import App from 'pages/app';
import * as serviceWorker from './serviceWorker';
import Themes from 'themes/index';

import './index.css';
import { selectIsRTL } from 'store/selectors';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

const { store, persistor } = persistedStore;

setAxiosToken();
initAnalytics();
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const rootElement = document.getElementById('root');
const Router = () => {
  const isRTL = useSelector(selectIsRTL);
  return (
    <BrowserRouter>
      <LayoutProvider>
        <ThemeProvider theme={Themes.createDefaultTheme(isRTL)}>
          <StylesProvider jss={jss}>
            <PersistGate loading={null} persistor={persistor}>
              <CookiesProvider>
                <App />
              </CookiesProvider>
            </PersistGate>
          </StylesProvider>
        </ThemeProvider>
      </LayoutProvider>
    </BrowserRouter>
  );
};
const AppWrapper = (
  <Provider store={store}>
    <Router />
  </Provider>
);

render(AppWrapper, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
