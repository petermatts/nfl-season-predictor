import { combineReducers } from 'redux';
import TeamReducer from './TeamReducer';
import ScheduleReducer from './ScheduleReducer';

const reducers = combineReducers({
    NFL: TeamReducer,
    //Schedule: ScheduleReducer
});

export default reducers;