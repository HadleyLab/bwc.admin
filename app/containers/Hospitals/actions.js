import {createAction} from 'redux-actions';
import {GET_HOSPITALS, DEL_HOSPITAL, EDIT_HOSPITAL, ONEDIT_HOSPITAL, ADD_HOSPITAL} from './constants';
import {getListHospitalsApi, delHospitalApi, editHospitalApi, onEditHospitalApi, createHospitalApi} from './api';

export const getListHospitalsAction = createAction(GET_HOSPITALS, async (d) => await getListHospitalsApi(d));
export const delHospitalAction = createAction(DEL_HOSPITAL, async (d) => await delHospitalApi(d));
export const editHospitalAction = createAction(EDIT_HOSPITAL, async (d) => await editHospitalApi(d));
export const onEditHospitalAction = createAction(ONEDIT_HOSPITAL,  async (d) => await onEditHospitalApi(d));
export const createHospitalAction = createAction(ADD_HOSPITAL,  async (d) => await createHospitalApi(d));
