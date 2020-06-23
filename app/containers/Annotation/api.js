import { apiCreate } from '../../utils/api'
import apiSubmissionError from '../../utils/apiSubmissionError'

export const getListAnnotationsApi = (data) => apiCreate().get('/annotations/get', data).then(apiSubmissionError)
export const delAnnotationApi = (data) => apiCreate().post('/annotations/del', data).then(apiSubmissionError)
export const editAnnotationApi = (data) => apiCreate().post('/annotations/update', data).then(apiSubmissionError)
export const onEditAnnotationApi = (data) => apiCreate().get(`/annotations/get/${data.id}`).then(apiSubmissionError)
export const createAnnotationApi = (data) => apiCreate().post('/annotations/add', data).then(apiSubmissionError)