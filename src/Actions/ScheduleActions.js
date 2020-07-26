import { UPDATE_SCHEDULE } from './types'; 

export const updateSchedule = (gameWeek, tie, team1, team2) => {
    const game = {};
    // console.log(gameWeek);
    // console.log(tie);
    // console.log(team1);
    // console.log(team2);

    if(tie) {
        Object.assign(game, { winner: false, picked: true });
    } else {
        Object.assign(game, { winner: team1, picked: true });
    }

    return {
        type: UPDATE_SCHEDULE,
        team1,
        team2,
        week: gameWeek,
        payload: game
    };

};