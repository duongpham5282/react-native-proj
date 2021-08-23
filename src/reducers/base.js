import { variantExtractor } from 'utils/utils';
import actions from 'actions/get-checklists';

export const CHANNELS = ['EAT_IN', 'DINE_IN', 'CARRY_OUT', 'DELIVERY'];
export const DOUGH_PLATFORM = ['Fresh - Commissary', 'Fresh - Back of House', 'Frozen'];
export const EQUIPMENT = [
  'Buffet',
  'Carbonated Drink Machine',
  'Coffee Machine',
  'Freezer',
  'Fridge',
  'Fryer',
  'Hot Hold',
  'Ice Cream Machine',
  'Ice Machine',
  'Make Table',
  'Mixer',
  'Oven',
  'Salad Bar',
  'Walk-in Freezer',
  'Walk-in Fridge',
];
export const SHIFTS = ['AM', 'DAY', 'PM', 'OVERNIGHT', 'EVENING'];
export const FREQUENCY = ['DAILY', 'WEEKLY', 'BIWEEKLY', 'MONTHLY'];
export const STATUSES = ['READY', 'RUN', 'REVIEW'];

export const baseInitialState = {
  categoriesVariants: [],
  qualifiersVariants: [],
  offsetTypesVariants: [],
  channelsVariants: CHANNELS,
  doughPlatformVariants: DOUGH_PLATFORM,
  equipmentVariants: EQUIPMENT,
  shiftsVariants: SHIFTS,
  frequencyVariants: FREQUENCY,
  statusVariants: STATUSES,
};

export const baseReducer = (state = baseInitialState, { type, payload }) => {
  switch (type) {
    case actions.success(payload).type:
      return {
        ...state,
        categoriesVariants: variantExtractor(payload, 'category'),
        qualifiersVariants: variantExtractor(payload, 'qualifier'),
        offsetTypesVariants: variantExtractor(payload, 'offsetType'),
      };
    default:
      return baseInitialState;
  }
};
