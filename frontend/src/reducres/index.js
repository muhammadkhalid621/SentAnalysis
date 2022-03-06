import { combineReducers } from 'redux';
import auth from './auth';
import scrape from './scrape';
import profile from './profile';

export default combineReducers({
    auth,
    scrape,
    profile,

});