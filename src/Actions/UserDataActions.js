import { UPDATE_UGAMELIST, ADD_BYE, NAME } from './types';

/**
 * pick = 0 => unpicked 
 * pick = 1 => home team wins
 * pick = 2 => away team wins
 * pick = 3 => the game is a tie
 * 
 * This data is in Constants.js
 */
export const updateUserGamePicks = (gameId, pick, gridLocs, week) => {
    return {
        type: UPDATE_UGAMELIST,
        payload: { key: gameId, gridLocs, pick, week }
    }
};

export const addBye = (pickTeam, teamSchedulePicks) => {
    return {
        type: ADD_BYE,
        payload: { pickTeam, teamSchedulePicks }
    };
};

/**
 * @param {String} name of username
 * null if logging out user
 */
export const name = (name) => {
    return {
        type: NAME,
        payload: name
    };
}
