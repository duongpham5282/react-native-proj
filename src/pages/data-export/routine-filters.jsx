import React from 'react';

import { get } from 'lodash';
import classNames from 'classnames';
import { Switch, FormControl, Grid, FormControlLabel, Typography, Card, CardContent } from '@material-ui/core';
import { useSelector } from 'react-redux';

import { OUTPUT_TYPES } from 'constants/constants';
import { selectLocale } from 'store/selectors';

import { CheckboxSelect } from 'components/checkbox-select/checkbox-select';

import useStyles from './data-export.styles';

export function RoutineFilterCheckbox({ checked, label, onChange }) {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={onChange}
          color="primary"
        />
      }
      label={label}
    />
  );
}

export function RoutineFilters({
  categories,
  setState,
  statuses,
  shifts,
  outputType,
  withoutImages,
  withQuestions
}) {
  const classes = useStyles();
  const locale = useSelector(selectLocale) || {};
  const isRemovePhotosVisible = outputType === OUTPUT_TYPES.ROUTINE_PDF;
  const isRemoveItemsVisible = outputType === OUTPUT_TYPES.ROUTINE_EXCEL;
  const onChangeSetState = React.useCallback((key, value) => {
    setState(prevState => ({
      ...prevState,
      [key]: value,
    }));
  }, [setState]);

  return (
    <Grid item md={4} xs={12}>
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {get(locale, 'admin.filter.sections.secondary', '')}
          </Typography>
          <FormControl className={classes.formControl}>
            <CheckboxSelect
              name={get(locale, 'admin.filter.name', '')}
              placeholder={get(locale, 'admin.filter.all.placeholder', '')}
              onChange={e => onChangeSetState('category', e)}
              options={categories.map(cat => ({
                label: cat.value,
                value: cat.key,
              }))}
              classes={classes}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <CheckboxSelect
              name={get(locale, 'admin.filter.status', '')}
              placeholder={get(locale, 'admin.filter.all.placeholder', '')}
              onChange={e => onChangeSetState('status', e)}
              options={statuses}
              classes={classes}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <CheckboxSelect
              name={get(locale, 'admin.filter.shift', '')}
              placeholder={get(locale, 'admin.filter.all.placeholder', '')}
              onChange={e => onChangeSetState('shift', e)}
              options={shifts}
              classes={classes}
            />
          </FormControl>
          {isRemovePhotosVisible && (
            <FormControl className={classNames(classes.formControl, classes.checkbox)}>
              <RoutineFilterCheckbox
                checked={withoutImages}
                onChange={e => onChangeSetState('withoutImages', e.target.checked)}
                label={get(locale, 'admin.filter.removePhotos', '')}
              />
            </FormControl>
          )}
          {isRemoveItemsVisible && (
            <FormControl className={classNames(classes.formControl, classes.checkbox)}>
              <RoutineFilterCheckbox
                checked={withQuestions}
                onChange={e => onChangeSetState('withQuestions', e.target.checked)}
                label={get(locale, 'admin.filter.includeQuestions', '')}
              />
            </FormControl>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}

export default RoutineFilters;
