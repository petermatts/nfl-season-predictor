import { schedule } from '../Schedule/2020';
import { UPDATE_SCHEDULE } from '../Actions/types';

const INITIAL_STATE = schedule;

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case UPDATE_SCHEDULE:
            const stateArr = Object.entries(state);
            let weekGames = null;
            let weekByes = [];
            let gameIndex = null;

            for(let i = 0; i < stateArr.length; i++) {
                if(stateArr[i][0] === action.week) {
                    weekGames = stateArr[i][1].games;
                    weekByes = stateArr[i][1].byes;
                    i = stateArr.length; //break loop once condition is met
                }
            }

            for(let i = 0; i < weekGames.length; i++) {
                const hometeam = weekGames[i].home.abrv;
                const awayteam = weekGames[i].away.abrv;
                if(hometeam === action.team1 || awayteam === action.team1) {
                    gameIndex = i;
                    break;
                }
            }

            if(weekGames !== null) {
                if(action.team2 === undefined) {
                    const updateWeek = weekGames[gameIndex];
                    Object.assign(updateWeek, { winner: action.payload.winner, picked: action.payload.picked });
                    const update = { games: weekGames, byes: weekByes };
                    
                    return { ...state, [action.week]: update };
                } else {
                    //if there is a tie

                    const updateWeek = weekGames[gameIndex];
                    Object.assign(updateWeek, { winner: null, picked: action.payload.picked });
                    const update = { games: weekGames, byes: weekByes };

                    return { ...state, [action.week]: update };
                }
            } else {
                console.error('something went wrong');
                return state;
            }
        default:
            return state;
    }
};

