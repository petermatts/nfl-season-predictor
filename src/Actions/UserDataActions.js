import { UPDATE_UGAMELIST } from './types';

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
