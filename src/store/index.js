import {createStore, combineReducers, } from 'redux';
import * as reducer from './reducer';

const store = createStore(combineReducers(reducer));
export default store;
