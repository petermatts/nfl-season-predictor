import { combineReducers } from 'redux';
import TeamReducer from './TeamReducer';

const reducers = combineReducers({
    NFL: TeamReducer
});

export default reducers;