import typeToReducer from 'type-to-reducer';
import {fromJS} from 'immutable';
import {GET_TRANSFER_LIST, UPDATE_TRANSFER_STATUS} from './constants';
import reducerParse from 'utils/reducerParse';

const initialState = fromJS({
    errors:{}
});

export default typeToReducer({
    [GET_TRANSFER_LIST]: {
        START: (state = fromJS([]), d) => reducerParse(d, (data) => {
            return state.set('transfers', null);
        }),
        SUCCESS: (state = fromJS([]), d) => reducerParse(d, (data) => {
                return state
                    .set('count', fromJS(data.count))
                    .set('transfers', fromJS(data.transfers));
            },
            (payload) => {
                const {data, status} = payload;
                return state.set('errors', fromJS(data));
            },
        ),
        FAIL: (state = fromJS([]), d)=>state
    },
    [UPDATE_TRANSFER_STATUS]: {
        SUCCESS: (state = fromJS([]), d) => reducerParse(d, (data) => {
                const transfers =  state.get('transfers');
                const listTransfers = transfers.toJS();
                listTransfers.forEach((user, key)=>{
                    if (user._id === data._id) {
                        listTransfers[key] = data;
                    }
                })

                return state.set('transfers', fromJS(listTransfers));
            },
            (payload) => {
                const {data, status} = payload;
                return state.set('errors', fromJS(data));
            },
        ),
        FAIL: (state = fromJS([]), d)=>state
    },
}, initialState);
