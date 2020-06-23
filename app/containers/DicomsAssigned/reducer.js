import typeToReducer from 'type-to-reducer';
import {fromJS} from 'immutable';
import {GET_DICOM_LIST, GET_TRANSFER_LIST, ASSIGN_TRANSFER, GET_STUDY_LIST, GET_TAGS} from './constants';
import reducerParse from 'utils/reducerParse';

const initialState = fromJS({
    errors:{}
});

export default typeToReducer({
    [GET_STUDY_LIST]: {
      SUCCESS: (state = fromJS([]), d) => reducerParse(d, (data) => {
          return state.set('study', fromJS(data));
        },
        (payload) => {
          const {data, status} = payload;
          return state.set('errors', fromJS(data));
        },
      ),
      FAIL: (state = fromJS([]), d)=>state
    },
    [GET_DICOM_LIST]: {
        START: (state = fromJS([]), d) => reducerParse(d, (data) => {
            return state.set('dicoms', null);
        }),
        SUCCESS: (state = fromJS([]), d) => reducerParse(d, (data) => {
                return state
                    .set('count', fromJS(data.count))
                    .set('dicoms', fromJS(data.dicoms));
            },
            (payload) => {
                const {data, status} = payload;
                return state.set('errors', fromJS(data));
            },
        ),
        FAIL: (state = fromJS([]), d)=>state
    },
    [GET_TRANSFER_LIST]: {
        SUCCESS: (state = fromJS([]), d) => reducerParse(d, (data) => {
                return state.set('transfers', fromJS(data.transfers));
            },
            (payload) => {
                const {data, status} = payload;
                return state.set('errors', fromJS(data));
            },
        ),
        FAIL: (state = fromJS([]), d)=>state
    },
    [ASSIGN_TRANSFER]: {
        SUCCESS: (state = fromJS([]), d) => reducerParse(d, (data) => {
                const dicoms =  state.get('dicoms');
                const transfers = state.get('transfers');

                let listDicoms = dicoms.toJS();
                let listTransfers = transfers.toJS();


                listDicoms.forEach((dicom, key)=>{
                    if (dicom._id === data._id) {
                        listDicoms[key] = data;
                    }
                })

                const indexT = listTransfers.findIndex( d=>d._id === data.transfer._id)
                if (indexT !== -1) {
                    listTransfers.splice(indexT, 1)
                }

                return state
                    .set('dicoms', fromJS(listDicoms))
                    .set('transfers', fromJS(listTransfers))
                ;
            },
            (payload) => {
                const {data, status} = payload;
                return state.set('errors', fromJS(data));
            },
        ),
        FAIL: (state = fromJS([]), d)=>state
    },
    [GET_TAGS]: {
        SUCCESS: (state = fromJS([]), d) => reducerParse(d, (data) => {
                return state.set('tags', fromJS(data));
            },
            (payload) => {
                const {data, status} = payload;
                return state.set('errors', fromJS(data));
            },
        ),
        FAIL: (state = fromJS([]), d)=>state
    },
}, initialState);
