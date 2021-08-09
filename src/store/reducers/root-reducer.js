import { combineReducers } from 'redux';
import serverReducer from './reducers';


const rootReducer = combineReducers({
servers:serverReducer,
})