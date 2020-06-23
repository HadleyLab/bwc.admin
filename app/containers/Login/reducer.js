import typeToReducer from 'type-to-reducer';
import {fromJS} from 'immutable';
import {LOGIN} from './constants';
import reducerParse from 'utils/reducerParse';
import setUser from 'utils/setUser';

const initialState = fromJS({
  errors:{}
});

export default typeToReducer({
  [LOGIN]: {
    SUCCESS: (state = fromJS([]), d) => reducerParse(d, (data) => {
        return state;
      }
      ,
      (payload) => {
        const {data, status} = payload;
        return state.set('errors',fromJS(data));
      },
    ),
    FAIL: (state = fromJS([]), d)=>state
  },
}, initialState);
