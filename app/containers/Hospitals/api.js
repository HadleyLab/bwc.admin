import { apiCreate } from '../../utils/api'
import apiSubmissionError from '../../utils/apiSubmissionError'

export const getListHospitalsApi = (data) => apiCreate().get('/hospitals/get', data).then(apiSubmissionError)
export const delHospitalApi = (data) => apiCreate().post('/hospitals/del', data).then(apiSubmissionError)
export const editHospitalApi = (data) => apiCreate().post('/hospitals/update', data).then(apiSubmissionError)
export const onEditHospitalApi = (data) => apiCreate().get(`/hospitals/get/${data.id}`).then(apiSubmissionError)
export const createHospitalApi = (data) => apiCreate().post('/hospitals/add', data).then(apiSubmissionError)