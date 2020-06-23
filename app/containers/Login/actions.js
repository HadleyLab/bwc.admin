import {createAction} from 'redux-actions';
import {LOGIN} from './constants';
import {loginApi} from './api';

export const loginAction = createAction(LOGIN, async (d) => await loginApi(d));
