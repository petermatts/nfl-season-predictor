import { GET_GAMEGRID, GET_GAMELIST, GET_SCHEDULE } from './../Actions/types';

const INITIAL_STATE = {
    gamegrid: null,
    gamelist: null,
    schedule: null
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_GAMEGRID:
            return { ...state, gamegrid: action.payload };
        case GET_GAMELIST:
            return { ...state, gamelist: action.payload };
        case GET_SCHEDULE:
            return { ...state, schedule: action.payload };
        default:
            return state;
    }
};
