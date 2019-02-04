import { UPDATE_APPLIED_FILTER } from './types';

export const updateAppliedFilter = (selectedValues, selectedKey) => {
  return {
    type: UPDATE_APPLIED_FILTER,
    payload: { selectedValues, selectedKey },
  }
}