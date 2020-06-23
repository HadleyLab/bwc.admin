import typeToReducer from 'type-to-reducer';
import {fromJS} from 'immutable';
import {ONEDIT_HOSPITAL} from './constants';
import reducerParse from 'utils/reducerParse';

const initialState = fromJS({
  errors:{}
});

export default typeToReducer({
  [ONEDIT_HOSPITAL]: {
    START: (state = fromJS([]), d) => reducerParse(d, (data) => {
      return state.set('hospital', null);
    }),
    SUCCESS: (state = fromJS([]), d) => reducerParse(d, (data) => {
        return state.set('hospital', fromJS(data));
      },
      (payload) => {
        const {data, status} = payload;
        return state.set('errors', fromJS(data));
      },
    ),
    FAIL: (state = fromJS([]), d)=>state
  },
}, initialState);
