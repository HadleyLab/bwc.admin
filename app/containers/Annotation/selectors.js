import { createSelector } from 'reselect';

const selectAnnotations = (state) => state.get('annotationsContainer');

export const makeAnnotations = () => createSelector(
    selectAnnotations,
  (substate) => substate.get('annotations')
);



