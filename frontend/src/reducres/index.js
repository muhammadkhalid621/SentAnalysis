import { combineReducers } from 'redux';
import auth from './auth';
import scrape from './scrape';

export default combineReducers({
    auth,
    scrape,

});