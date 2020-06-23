import { createSelector } from 'reselect';

const selectHospitals = (state) => state.get('hospitalsContainer');

export const makeHospitals = () => createSelector(
    selectHospitals,
  (substate) => substate.get('hospitals')
);

export const makeCount = () => createSelector(
    selectHospitals,
  (substate) => substate.get('count')
);

