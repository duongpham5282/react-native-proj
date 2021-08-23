import actions from 'actions/countries';
import reducer from 'reducers/default';

export const countriesInitialState = {
  data: [],
};
export const countriesReducer = reducer(actions, countriesInitialState);
