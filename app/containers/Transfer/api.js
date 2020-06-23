import { apiCreate } from 'utils/api'
import apiSubmissionError from 'utils/apiSubmissionError'


export const getListTransfersApi = (data) => apiCreate().get('/transfer/get', data).then(apiSubmissionError);
export const updateTransferStatus = (data) => apiCreate().post('/transfer/status', data).then(apiSubmissionError);