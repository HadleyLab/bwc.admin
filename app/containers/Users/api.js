import { apiCreate } from 'utils/api'
import apiSubmissionError from 'utils/apiSubmissionError'


export const getListUsersApi = (data) => apiCreate().get('/users/get', data).then(apiSubmissionError);
export const updateUsersStatus = (data) => apiCreate().post('/users/update/status', data).then(apiSubmissionError);