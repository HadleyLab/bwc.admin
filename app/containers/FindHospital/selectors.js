import { createSelector } from 'reselect';

const selectHospitals = (state) => state.get('hospitalsContainer');

export const makeHospitals = () => createSelector(
    selectHospitals,
    (substate) => substate.get('hospitals')
);

export const makeCity = () => createSelector(
    selectHospitals,
    (substate) => substate.get('city')
);

export const makeLoad = () => createSelector(
    selectHospitals,
    (substate) => substate.get('load')
);

export const makeCount = () => createSelector(
    selectHospitals,
    (substate) => substate.get('count')
);


