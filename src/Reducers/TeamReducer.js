import { Teams } from '../Teams/NFL_Teams';
import { GAME_RESULT, GAME_RESULT_TIE,UPDATE_SOV } from './../Actions/types';

const INITIAL_STATE = Teams;

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GAME_RESULT:
            return { ...state, [action.payload.winner.abrv]: action.payload.winner, [action.payload.loser.abrv]: action.payload.loser };
        case GAME_RESULT_TIE:
            return { ...state, [action.payload.home.abrv]: action.payload.home, [action.payload.away.abrv]: action.payload.away };
        case UPDATE_SOV:
            return { ...state, [action.payload.abrv]: action.payload.otherTeam };
        default:
            const init = {};
            for(let i = 0; i < Teams.length; i++) {
                Object.assign(init, { [Teams[i].abrv]: Teams[i] });
            }
            return init;
    }
}
