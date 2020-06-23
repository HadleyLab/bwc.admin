import {createAction} from 'redux-actions';
import {FIND, REDEFINITION} from './constants';
import {findApi, redefinitionApi} from './api';

export const FindAction = createAction(FIND, async (d) => await findApi(d));
export const redefinitionAction = createAction(REDEFINITION, async (d) => await redefinitionApi(d));

