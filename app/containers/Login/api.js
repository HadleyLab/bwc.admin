import { apiCreate } from '../../utils/api'
import apiSubmissionError from '../../utils/apiSubmissionError'

export const loginApi = (data) => apiCreate().post('/account/login', data).then(apiSubmissionError)