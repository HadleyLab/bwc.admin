import {createAction} from 'redux-actions';
import {GET_TRANSFER_LIST, UPDATE_TRANSFER_STATUS} from './constants';
import {getListTransfersApi, updateTransferStatus} from './api';

export const getListTransfersAction = createAction(GET_TRANSFER_LIST, async (d) => await getListTransfersApi(d));
export const updateTransfersStatusAction = createAction(UPDATE_TRANSFER_STATUS, async (d) => await updateTransferStatus(d));