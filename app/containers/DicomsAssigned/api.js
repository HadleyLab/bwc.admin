import { apiCreate } from 'utils/api'
import apiSubmissionError from 'utils/apiSubmissionError'

export const getListPackagesApi = (data) => apiCreate().get('/packages/get', data).then(apiSubmissionError)
export const getListStudyApi = (data) => apiCreate().get('/dicoms/get', data).then(apiSubmissionError)
export const getListTransfersApi = (data) => apiCreate().get('/transfer/get', data).then(apiSubmissionError)
export const assignTransferApi = (data) => apiCreate().post('/packages/assign/transfer', data).then(apiSubmissionError)
export const getListAnnotationsApi = (data) => apiCreate().get('/annotations/get', data).then(apiSubmissionError)
export const saveDicomApi = (data) => apiCreate().post('/files/save', data).then(apiSubmissionError)