import { combineReducers } from 'redux';
import auth from './auth';
import scrape from './scrape';
import profile from './profile';
import model from './model'
import clients from './clients'
import task from './task'
import analysis from './analysis';

export default combineReducers({
    auth,
    scrape,
    profile,
    model,
    clients,
    task,
    analysis,
});