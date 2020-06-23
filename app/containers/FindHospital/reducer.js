import typeToReducer from 'type-to-reducer'
import { fromJS, toJS } from 'immutable'
import {FIND, TRANSFER, ADD_HOSPITAL} from './constants'
import reducerParse from 'utils/reducerParse'
import logIn from '../../utils/logIn'

const initialState = fromJS({
    errors:{},
    hospitals: [],
    city: [],
});

export default typeToReducer({
    [TRANSFER]: {
        SUCCESS: (state = fromJS([]), d) => reducerParse(d, (data) => {
                return state;
            }
            ,
            (payload) => {
                const {data, status} = payload;
                return state.set('errors',fromJS(data));
            },
        ),
    },
    [FIND]: {
        START: (state = fromJS([]), d) => reducerParse(d, (data) => {
            return state.set('load', true);
        }),
        SUCCESS: (state = fromJS([]), d) => reducerParse(d, (data) => {

                let oldlistHospitals = state.get('hospitals').toJS();
                let newListHospitals = data.hospitals;
                let resulListHospitals = [];

                const page = fromJS(data.page);

                if (page > 1) {
                    resulListHospitals = oldlistHospitals.concat(newListHospitals);
                } else {
                    resulListHospitals = newListHospitals;
                }

                let stateN = state.set('hospitals', fromJS(resulListHospitals));

                if (data.city) {
                    stateN = stateN.set('city', data.city);
                }

                stateN = stateN.set('load', false);
                stateN = stateN.set('count', data.count);
                return stateN;
            },
            (payload) => {
                const {data, status} = payload;
                return state.set('errors', fromJS(data));
            },
        ),
        FAIL: (state = fromJS([]), d)=>states
    }
}, initialState)
