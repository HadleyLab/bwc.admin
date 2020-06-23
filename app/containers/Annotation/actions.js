import {createAction} from 'redux-actions';
import {GET_ANNOTATIONS, DEL_ANNOTATION, EDIT_ANNOTATION, ONEDIT_ANNOTATION, ADD_ANNOTATION} from './constants';
import {getListAnnotationsApi, delAnnotationApi, editAnnotationApi, onEditAnnotationApi, createAnnotationApi} from './api';

export const getListAnnotationsAction = createAction(GET_ANNOTATIONS, async (d) => await getListAnnotationsApi(d));
export const delAnnotationAction = createAction(DEL_ANNOTATION, async (d) => await delAnnotationApi(d));
export const editAnnotationAction = createAction(EDIT_ANNOTATION, async (d) => await editAnnotationApi(d));
export const onEditAnnotationAction = createAction(ONEDIT_ANNOTATION,  async (d) => await onEditAnnotationApi(d));
export const createAnnotationAction = createAction(ADD_ANNOTATION,  async (d) => await createAnnotationApi(d));
