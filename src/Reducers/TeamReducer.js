import { Teams } from '../Teams/NFL_Teams';
import { GAME_RESULT, GAME_RESULT_TIE,UPDATE_SOV, LOAD_SAVE } from './../Actions/types';

const T = Teams(2021); //season should be updated by admin to the current/upcoming season
const INITIAL_STATE = {};
for(let i = 0; i < T.length; i++) {
    Object.assign(INITIAL_STATE, { [T[i].abrv]: T[i] });
}

// console.log(T);

// const INITIAL_STATE = Teams;
// console.log(Teams);
// console.log(INITIAL_STATE);


export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GAME_RESULT:
            return { ...state, [action.payload.winner.abrv]: action.payload.winner, [action.payload.loser.abrv]: action.payload.loser };
        case GAME_RESULT_TIE:
            return { ...state, [action.payload.home.abrv]: action.payload.home, [action.payload.away.abrv]: action.payload.away };
        case UPDATE_SOV:
            return { ...state, [action.payload.abrv]: action.payload.otherTeam };
        case LOAD_SAVE:
            const reset = Teams(2021); //action payload of season instead of hardcoded number
            const fix = {};
            for(let i = 0; i < reset.length; i++) {
                Object.assign(fix, { [reset[i].abrv]: reset[i] });
            }
            
            return fix;
        default:
            return state;
    }
}
