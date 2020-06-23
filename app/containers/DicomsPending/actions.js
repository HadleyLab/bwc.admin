import {createAction} from 'redux-actions';
import {GET_DICOM_LIST, GET_TRANSFER_LIST, ASSIGN_TRANSFER, GET_STUDY_LIST, GET_TAGS, SAVE_FILES} from './constants';
import {getListPackagesApi, getListTransfersApi, assignTransferApi, getListStudyApi, getListAnnotationsApi, saveDicomApi} from './api';

export const getListPackagesAction = createAction(GET_DICOM_LIST, async (d) => await getListPackagesApi(d));
export const getListStudyAction = createAction(GET_STUDY_LIST, async (d) => await getListStudyApi(d));
export const getListTransfersAction = createAction(GET_TRANSFER_LIST, async (d) => await getListTransfersApi(d));
export const assignTransferAction = createAction(ASSIGN_TRANSFER, async (d) => await assignTransferApi(d));
export const getListAnnotationsAction = createAction(GET_TAGS, async (d) => await getListAnnotationsApi(d));
export const saveDicomAction = createAction(SAVE_FILES, async (d) => await saveDicomApi(d));