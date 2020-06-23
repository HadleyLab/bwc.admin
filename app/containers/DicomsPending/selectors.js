import {createSelector} from 'reselect';

const selectDicom = (state) => state.get('dicomContainer');

export const makeDicom = () => createSelector(
    selectDicom,
    (substate) => substate.get('dicoms')
);

export const makeStudy = () => createSelector(
    selectDicom,
    (substate) => substate.get('study')
);

export const makeTags = () => createSelector(
    selectDicom,
    (substate) => substate.get('tags')
);

export const makeTransfers = () => createSelector(
    selectDicom,
    (substate) => substate.get('transfers')
);

export const makeCount = () => createSelector(
    selectDicom,
    (substate) => substate.get('count')
);