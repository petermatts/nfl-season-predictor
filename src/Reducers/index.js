import { combineReducers } from 'redux';
import TeamReducer from './TeamReducer';
import ScheduleReducer from './ScheduleReducer';
import UserDataReducer from './UserDataReducer';
import SettingsReducer from './SettingsReducer';

const reducers = combineReducers({
    NFL: TeamReducer,
    schedule: ScheduleReducer,
    userdata: UserDataReducer,
    settings: SettingsReducer
});

export default reducers;