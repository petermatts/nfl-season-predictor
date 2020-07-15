import { Teams } from '../Teams/NFL_Teams';
import { GAME_RESULT, GAME_RESULT_TIE } from './../Actions/types';

const INITIAL_STATE = Teams;

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GAME_RESULT:
            console.log(action);
            return { ...state, team: action.payload };
        case GAME_RESULT_TIE:
                return { ...state, team: action.payload };
        default:
            return state;
    }
};