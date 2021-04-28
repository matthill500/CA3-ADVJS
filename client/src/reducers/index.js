import {combineReducers} from 'redux';

import articles from './articles';
import authReducer from './Auth';

export default combineReducers({
    articles,
    authReducer
})