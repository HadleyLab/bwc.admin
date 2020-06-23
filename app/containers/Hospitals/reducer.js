import typeToReducer from 'type-to-reducer';
import {fromJS} from 'immutable';
import {GET_HOSPITALS} from './constants';
import reducerParse from 'utils/reducerParse';

const initialState = fromJS({
  errors:{}
});

export default typeToReducer({
  [GET_HOSPITALS]: {
        START: (state = fromJS([]), d) => reducerParse(d, (data) => {
            return state.set('hospitals', null);
        }),
        SUCCESS: (state = fromJS([]), d) => reducerParse(d, (data) => {
            return state
                    .set('count', fromJS(data.count))
                    .set('hospitals', fromJS(data.hospitals));
        },
        (payload) => {
            const {data, status} = payload;
            return state.set('errors', fromJS(data));
        },
    ),
    FAIL: (state = fromJS([]), d)=>state
  },
}, initialState);
