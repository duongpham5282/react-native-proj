import { transform } from 'lodash';
import actions from 'actions/areas';

export const areasInitialState = {
  data: [],
};

export const areasReducer = (state = areasInitialState, { type, payload }) => {
  switch (type) {
    case actions.name:
      return {
        ...state,
      };
    case actions.success(payload).type:
      return {
        ...state,
        data: {
          ...transform(
            payload,
            (res, val, key) => {
              res[key] = val
                .filter(area => area.areaId)
                .map(area => ({
                  ...area,
                  label: `${area.areaName} (${area.areaId})`,
                }));
            },
            {},
          ),
          ...state.data,
        },
      };
    case actions.failed(payload).type:
      return {
        ...state,
      };
    default:
      return state;
  }
};
