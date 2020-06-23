import typeToReducer from 'type-to-reducer';
import {fromJS} from 'immutable';
import {GET_ANNOTATIONS} from './constants';
import reducerParse from 'utils/reducerParse';

const initialState = fromJS({
  errors:{}
});

export default typeToReducer({
  [GET_ANNOTATIONS]: {
        START: (state = fromJS([]), d) => reducerParse(d, (data) => {
            return state.set('annotations', null);
        }),
        SUCCESS: (state = fromJS([]), d) => reducerParse(d, (data) => {
            return state
                    .set('annotations', fromJS(data.annotations));
        },
        (payload) => {
            const {data, status} = payload;
            return state.set('errors', fromJS(data));
        },
    ),
    FAIL: (state = fromJS([]), d)=>state
  },
}, initialState);
