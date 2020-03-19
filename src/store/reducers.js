import { combineReducers } from 'redux'
import shop from './shop'
import data from './data'
const reducers = combineReducers({
    shop,
    data
});
export default reducers;