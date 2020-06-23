import typeToReducer from 'type-to-reducer';
import {fromJS} from 'immutable';
import {GET_USERS_LIST, UPDATE_USERS_STATUS} from './constants';
import reducerParse from 'utils/reducerParse';

const initialState = fromJS({
    errors:{}
});

export default typeToReducer({
    [GET_USERS_LIST]: {
        START: (state = fromJS([]), d) => reducerParse(d, (data) => {
            return state.set('users', null);
        }),
        SUCCESS: (state = fromJS([]), d) => reducerParse(d, (data) => {
                return state
                    .set('count', fromJS(data.count))
                    .set('users', fromJS(data.users));
            },
            (payload) => {
                const {data, status} = payload;
                return state.set('errors', fromJS(data));
            },
        ),
        FAIL: (state = fromJS([]), d)=>state
    },
    [UPDATE_USERS_STATUS]: {
        SUCCESS: (state = fromJS([]), d) => reducerParse(d, (data) => {
                const users =  state.get('users');
                const listUsers = users.toJS();
                listUsers.forEach((user, key)=>{
                    if (user._id === data._id) {
                        listUsers[key] = data;
                    }
                })

                return state.set('users', fromJS(listUsers));
            },
            (payload) => {
                const {data, status} = payload;
                return state.set('errors', fromJS(data));
            },
        ),
        FAIL: (state = fromJS([]), d)=>state
    },
}, initialState);
