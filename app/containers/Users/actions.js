import {createAction} from 'redux-actions';
import {GET_USERS_LIST, UPDATE_USERS_STATUS} from './constants';
import {getListUsersApi, updateUsersStatus} from './api';

export const getListUsersAction = createAction(GET_USERS_LIST, async (d) => await getListUsersApi(d));
export const updateUsersStatusAction = createAction(UPDATE_USERS_STATUS, async (d) => await updateUsersStatus(d));