import { GAME_RESULT, GAME_RESULT_TIE } from './types';

export function gameResult(result, pressed, tie) {
    console.log(result, pressed, tie);
    if(!tie) {
        const { winner, loser } = result;

        if(pressed) {
            if(winner.wins.indexOf(loser.abrv) >= 0) {
                winner.wins.splice(winner.wins.indexOf(loser.abrv), 1);
            } else if(winner.loses.indexOf(loser.abrv) >= 0) {
                winner.loses.splice(winner.loses.indexOf(loser.abrv), 1);
            } else if (winner.ties.indexOf(loser.abrv) >= 0) {
                winner.ties.splice(winner.ties.indexOf(loser.abrv), 1);
            }

            if(loser.wins.indexOf(winner.abrv) >= 0) {
                loser.wins.splice(loser.wins.indexOf(winner.abrv), 1);
            } else if(loser.loses.indexOf(winner.abrv) >= 0) {
                loser.loses.splice(loser.loses.indexOf(winner.abrv), 1);
            } else if (loser.ties.indexOf(winner.abrv) >= 0) {
                loser.ties.splice(loser.ties.indexOf(winner.abrv), 1);
            }
        }

        winner.wins.push(loser.abrv);
        loser.loses.push(winner.abrv);

        adjust(winner);
        adjust(loser);

        return  {
            type: GAME_RESULT,
            payload: { winner, loser }
        };
    } else {
        const { home, away } = result;

        if(pressed) {
            if(home.wins.indexOf(away.abrv) >= 0) {
                home.wins.splice(home.wins.indexOf(away.abrv), 1);
            } else if(home.loses.indexOf(away.abrv) >= 0) {
                home.loses.splice(home.loses.indexOf(away.abrv), 1);
            } else if (home.ties.indexOf(away.abrv) >= 0) {
                home.ties.splice(home.ties.indexOf(away.abrv), 1);
            }

            if(away.wins.indexOf(home.abrv) >= 0) {
                away.wins.splice(away.wins.indexOf(home.abrv), 1);
            } else if(away.loses.indexOf(home.abrv) >= 0) {
                away.loses.splice(away.loses.indexOf(home.abrv), 1);
            } else if (away.ties.indexOf(home.abrv) >= 0) {
                away.ties.splice(away.ties.indexOf(home.abrv), 1);
            }
        }

        home.ties.push(away.abrv);
        away.ties.push(home.abrv);
        adjust(home);
        adjust(away);

        return {
            type: GAME_RESULT_TIE,
            payload: { home, away }
        };
    }
}

const adjust = (team) => {
    team.record = getRecord(team);
    team.pct = getPCT(team);
    //Add more functions here to adjust teams per victories and loses
};

const getRecord = (team) => {
    const wins = team.wins.length;
    const loses = team.loses.length;
    const ties = team.ties.length;
    return ties === 0 ? `${wins}-${loses}`:`${wins}-${loses}-${ties}`;
};

const getPCT = (team) => {
    const wins = team.wins.length;
    const loses = team.loses.length;
    const ties = team.ties.length;
    if(wins+loses+ties === 0)
        return '0.0000';
    else
        return ((wins+(ties/2))/(wins+loses+ties)).toFixed(4);
}
