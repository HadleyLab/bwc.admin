import { apiCreate } from '../../utils/api'
import apiSubmissionError from '../../utils/apiSubmissionError'
export const editHospitalApi = (data) => apiCreate().post('/hospitals/update', data).then(apiSubmissionError)
export const onEditHospitalApi = (data) => apiCreate().get(`/hospitals/edit/get/${data.hash}`).then(apiSubmissionError)
