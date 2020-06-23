import { createSelector } from 'reselect';

const selectUsers = (state) => state.get('usersContainer');

export const makeUsers = () => createSelector(
    selectUsers,
    (substate) => substate.get('users')
);


export const makeCount = () => createSelector(
    selectUsers,
    (substate) => substate.get('count')
);