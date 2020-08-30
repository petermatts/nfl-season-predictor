import { UPDATE_SCHEDULE } from './types';
// import schedule from '../Schedule/2020';

export function updateSchedule (gameWeek, tie, result, gameCode) {
    const game = {};
    // console.log(gameWeek);

    if(tie) {
        Object.assign(game, { winner: false, picked: true });
    } else {
        Object.assign(game, { winner: result.winner.abrv, picked: true });
        // console.log(game);
    }

    return {
        type: UPDATE_SCHEDULE,
        // type: 'a',
        week: gameWeek,
        code: gameCode
    };
};