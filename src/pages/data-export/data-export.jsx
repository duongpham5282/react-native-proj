import React, { useState, useEffect, useCallback } from 'react';
import { get, isEmpty, compact } from 'lodash';
import moment from 'moment';
import { FormControl, Grid, Typography, Card, CardContent } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

/** Utils **/
import { trackEvent } from 'utils/analytics';

/** Actions **/
import fetchSearchCriteria from 'actions/search-criteria';
import exportPdf, { FAILED, LOADING, SUCCESS } from 'actions/export-pdf';
import fetchStoreSearch from 'actions/store-search';
import fetchCountries from 'actions/countries';
import fetchAreas from 'actions/areas';

/** Selectors **/
import {
  selectSearchCriteriaCategories,
  selectExportPdfValidation,
  selectExportPdfFile,
  selectExportPdfStatus,
  selectStores,
  selectCountries,
  selectAreas,
  selectLocale,
  selectPermissions,
} from 'store/selectors';

/** Components **/
import { PageHeader } from 'components/page-header/page-header';
import { RadioList } from 'components/radio-list/radio-list';
import { GenerateButton } from 'components/generate-button/generate-button';
import { AutocompleteSelect } from 'components/autocomplete-select/autocomplete-select';
import { CountrySelect } from 'components/country-select/country-select';
import { DateTimePickers } from 'components/datetime-pickers/datetime-pickers';

/** Constants **/
import { SHIFTS, STATUSES, OUTPUT_TYPES, getOutputTypes } from 'constants/constants';

import { RoutineFilters } from './routine-filters';
import useStyles from './data-export.styles';

const selectedOutput = OUTPUT_TYPES.ROUTINE_EXCEL;

export const DataExport = () => {
  const classes = useStyles();
  const locale = useSelector(selectLocale) || {};
  const dispatch = useDispatch();
  const categories = useSelector(selectSearchCriteriaCategories) || [];
  const validation = useSelector(selectExportPdfValidation) || '';
  const file = useSelector(selectExportPdfFile) || '';
  const loadingStatus = useSelector(selectExportPdfStatus) || '';
  const storesData = useSelector(selectStores) || [];
  const countries = useSelector(selectCountries) || [];
  const areas = useSelector(selectAreas) || [];
  const permissions = useSelector(selectPermissions);

  const [state, setState] = useState({
    category: [],
    withoutImages: true,
    withQuestions: false,
    country: '',
    status: [],
    store: [],
    area: [],
    shift: [],
    outputType: selectedOutput,
    selectedDateFrom: null,
    selectedDateTo: null,
    filteredTo: '',
    filteredFrom: '',
    cleanForm: true,
    statuses: STATUSES,
    shifts: SHIFTS,
  });

  const {
    category,
    withoutImages,
    withQuestions,
    country,
    status,
    store,
    area,
    shift,
    outputType,
    filteredTo,
    filteredFrom,
    cleanForm,
    statuses,
    shifts,
  } = state;

  const fetch = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      cleanForm: true,
    }));
  }, [
    filteredFrom,
    filteredTo,
    dispatch,
    withoutImages,
    withQuestions,
    category,
    status,
    store,
    shift,
    outputType,
    country,
    area,
  ]);

  useEffect(() => {
    if (!countries.length) {
      dispatch(fetchCountries.request());
    }

    dispatch(fetchSearchCriteria.request());
  }, [countries, dispatch]);

  useEffect(fetch, [fetch]);

  useEffect(() => {
    if (!isEmpty(locale)) {
      setState(prevState => ({
        ...prevState,
        statuses: prevState.statuses.map(status => ({
          ...status,
          label: get(locale, status.label, ''),
        })),
        shifts: prevState.shifts.map(status => ({
          ...status,
          label: get(locale, status.label, ''),
        })),
      }));
    }
  }, [locale]);

  const handleCountryChange = (e, value) => {
    const { countryName } = value;
    setState(prevState => ({
      ...prevState,
      country: countryName,
    }));
    if (countryName) {
      dispatch(fetchAreas.request(countryName));
      dispatch(fetchStoreSearch.request({ country: [countryName] }));
    }
  };

  const handleAreasChange = selectedAreas => {
    const ids = compact(selectedAreas.map(st => st.areaId));
    setState(prevState => ({
      ...prevState,
      area: ids,
    }));
    if (ids.length) {
      dispatch(fetchStoreSearch.request({ areaId: ids }));
    } else if (country) {
      dispatch(fetchStoreSearch.request({ country: [country] }));
      setState(prevState => ({
        ...prevState,
        store: [],
      }));
    }
  };
  const handleStoresChange = selectedStores => {
    const ids = compact(selectedStores.map(st => st.id));
    setState(prevState => ({
      ...prevState,
      store: ids,
    }));
  };

  const handleDateFromChange = data => {
    setState(prevState => ({
      ...prevState,
      filteredFrom: data,
    }));
  };

  const handleDateToChange = data => {
    setState(prevState => ({
      ...prevState,
      filteredTo: data,
    }));
  };

  const downloadFile = () => {
    let type, report;

    switch (outputType) {
      case OUTPUT_TYPES.OPPORTUNITIES:
        type = 'EXCEL';
        report = 'opportunities';
        break;
      case OUTPUT_TYPES.SCORECARD_STORE:
        report = 'metrics';
        type = 'store-scorecard';
        break;
      case OUTPUT_TYPES.SCORECARD_USER:
        report = 'metrics';
        type = 'user-scorecard';
        break;
      case OUTPUT_TYPES.ROUTINE_EXCEL:
      case OUTPUT_TYPES.ROUTINE_PDF:
        type = outputType.toUpperCase();
        report = 'checklists';
        break;
    }

    const dateTo = filteredTo
      ? moment(filteredTo)
          .toISOString()
          .replace(/T.+/gm, 'T00:00:00Z')
      : null;
    const dateFrom = filteredFrom
      ? moment(filteredFrom)
          .toISOString()
          .replace(/T.+/gm, 'T00:00:00Z')
      : null;

    let filters = {
      dateTo,
      dateFrom,
      storeIds: store,
    };

    if (report === 'checklists') {
      filters = {
        ...filters,
        name: category,
        status,
        shift,
        withoutImages,
        withoutItems: !withQuestions,
      };
    }

    trackEvent({
      category: 'Button',
      action: 'downloadReport',
      label: report,
    });

    dispatch(
      exportPdf.request({
        type,
        report,
        filters,
      }),
    );

    setState(prevState => ({
      ...prevState,
      cleanForm: false,
    }));
  };

  const onChangeOutputType = data => {
    setState(prevState => ({
      ...prevState,
      outputType: data,
    }));
  };

  const outputTypes = getOutputTypes(permissions);
  const isRoutineFiltersVisible = [OUTPUT_TYPES.ROUTINE_EXCEL, OUTPUT_TYPES.ROUTINE_PDF].includes(outputType);

  return (
    <>
      <PageHeader title={get(locale, 'admin.page.routines.history', '')} />
      <Grid container className={classes.root} spacing={2}>
        <Grid item md={3} xs={12} className={classes.item}>
          <RadioList
            locale={locale}
            classes={classes}
            onChange={onChangeOutputType}
            items={outputTypes}
            defaultState={outputType}
            disabledTypes={[]}
          />
        </Grid>

        <Grid item md={4} xs={12} className={classes.item}>
          <Card className={classes.card} variant="outlined">
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                {get(locale, 'admin.filter.sections.primary', '')}
              </Typography>
              <FormControl className={classes.formControl}>
                <CountrySelect
                  label={get(locale, 'admin.filter.geography', '')}
                  placeholder={get(locale, 'admin.filter.geography.placeholder', '')}
                  countries={countries}
                  onChange={handleCountryChange}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <AutocompleteSelect
                  label={get(locale, 'admin.filter.area', '')}
                  placeholder={get(locale, 'admin.filter.area.placeholder', '')}
                  options={areas[country]}
                  onChange={handleAreasChange}
                  all={get(locale, 'admin.filter.all.placeholder', '')}
                />
              </FormControl>
              <FormControl required className={classes.formControl}>
                <AutocompleteSelect
                  required
                  label={get(locale, 'admin.filter.store', '')}
                  placeholder={get(locale, 'admin.filter.store.placeholder', '')}
                  all={get(locale, 'admin.filter.all.placeholder', '')}
                  disabled={!country}
                  options={storesData}
                  onChange={handleStoresChange}
                />
              </FormControl>
              <DateTimePickers
                classes={classes}
                locale={locale}
                onDateFromChange={handleDateFromChange}
                onDateToChange={handleDateToChange}
              />
            </CardContent>
          </Card>
        </Grid>
        {isRoutineFiltersVisible && (
          <RoutineFilters
            categories={categories}
            statuses={statuses}
            shifts={shifts}
            outputType={outputType}
            setState={setState.bind(this)}
            withoutImages={withoutImages}
            withQuestions={withQuestions}
          />
        )}
      </Grid>

      <Grid container className={classes.root} spacing={2}>
        <Grid item md={3} xs={12} />
        <Grid item md={4} xs={12}>
          <Grid container direction="row" justify="flex-start" alignItems="center" className={classes.buttonContainer}>
            <GenerateButton
              locale={locale}
              file={file}
              handleClick={downloadFile}
              classes={classes}
              disabled={!store.length || !filteredFrom || loadingStatus === LOADING}
              isLoading={loadingStatus === LOADING}
              isGenerate={cleanForm || loadingStatus !== SUCCESS}
            />
          </Grid>
          <Typography gutterBottom component="p" variant="caption" color="textSecondary">
            * {get(locale, 'admin.common.form.required', '')}
          </Typography>
          {!cleanForm && loadingStatus === FAILED && !validation && (
            <Typography variant="subtitle2" color="error" gutterBottom>
              {get(locale, 'admin.filter.form.error', '')}
            </Typography>
          )}
          {!cleanForm && loadingStatus === FAILED && (
            <Typography variant="subtitle2" color="error">
              {validation}
            </Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
};
