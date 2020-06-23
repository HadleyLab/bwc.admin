import typeToReducer from 'type-to-reducer';
import {fromJS} from 'immutable';
import {ONEDIT_HOSPITAL} from '../../../constants';
import {  reducer as formReducer } from 'redux-form/immutable'
import reducerParse from '../../../../../utils/reducerParse'

const initialState = fromJS({
})

export default formReducer.plugin({
    HForm: typeToReducer({
        [ONEDIT_HOSPITAL]: {
            SUCCESS: (state = fromJS([]), d) => reducerParse(d, (data) => {
                    return state.set('values', fromJS(data));
                },
                (payload) => {
                    const {data, status} = payload;
                    return state.set('errors',fromJS(data));
                },
            ),
            FAIL: (state = fromJS([]), d)=>state
        },
    }, initialState),

})