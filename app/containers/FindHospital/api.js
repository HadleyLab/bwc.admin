import { apiCreate } from 'utils/api'
import apiSubmissionError from 'utils/apiSubmissionError'

export const findApi = (data) => apiCreate().post('/hospitals/find', data).then(apiSubmissionError);
export const redefinitionApi = (data) => apiCreate().post('/hospitals/redefinition', data).then(apiSubmissionError);
