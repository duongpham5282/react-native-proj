import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from 'components/layout/layout';
import { Error } from 'pages/error/error';

import { ROUTES } from 'constants/constants';
import { selectAdminLocale } from 'store/selectors';
import { setLocaleHeader } from 'api/auth';
import setLocale from 'actions/localization';
import { LOCALE_KEY } from 'constants/constants';
import { DEFAULT_LOCALE } from 'constants/constants';

const App = () => {
  const adminLocale = useSelector(selectAdminLocale) || '';
  const dispatch = useDispatch();

  useEffect(() => {
    const locale = localStorage.getItem(LOCALE_KEY) || DEFAULT_LOCALE;
    dispatch(setLocale.request(locale));
  }, [dispatch, adminLocale]);

  useEffect(() => {
    if (adminLocale) {
      setLocaleHeader(adminLocale);
    }
  }, [adminLocale]);

  return (
    <BrowserRouter>
      <Switch>
        <Route path={ROUTES.ROOT} component={Layout} />
        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  );
};

export default withRouter(App);
