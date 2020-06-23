import { combineReducers, createStore } from 'redux';
import session from './reducers/session'

const reducers = combineReducers({ session })
export default createStore(reducers);
