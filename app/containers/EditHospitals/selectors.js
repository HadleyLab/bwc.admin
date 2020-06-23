import { createSelector } from 'reselect';

const selectHospital = (state) => state.get('hospitalContainer');

export const makeHospitals = () => createSelector(
    selectHospital,
  (substate) => substate.get('hospital')
);

