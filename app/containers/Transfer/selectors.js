import { createSelector } from 'reselect';

const selectUsers = (state) => state.get('transferContainer');

export const makeTransfers = () => createSelector(
    selectUsers,
    (substate) => substate.get('transfers')
);

export const makeCount = () => createSelector(
    selectUsers,
    (substate) => substate.get('count')
);
