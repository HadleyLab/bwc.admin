import {createAction} from 'redux-actions';
import {EDIT_HOSPITAL, ONEDIT_HOSPITAL} from './constants';
import {editHospitalApi, onEditHospitalApi} from './api';

export const editHospitalAction = createAction(EDIT_HOSPITAL, async (d) => await editHospitalApi(d));
export const onEditHospitalAction = createAction(ONEDIT_HOSPITAL,  async (d) => await onEditHospitalApi(d));

