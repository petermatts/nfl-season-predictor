import { GAME_RESULT, GAME_RESULT_TIE } from './types';

export function gameResult(result, pressed, gameWeek, gameCode, tie) {
    console.log(result, pressed, tie);

    if(!tie) {
        const { winner, loser } = result;
        console.log(pressed);
        if(pressed) {
            if(winner.wins.lastIndexOf(loser.abrv) >= 0) {
                winner.wins.splice(winner.wins.lastIndexOf(loser.abrv), 1);
            } else if(winner.loses.lastIndexOf(loser.abrv) >= 0) {
                winner.loses.splice(winner.loses.lastIndexOf(loser.abrv), 1);
            } else if (winner.ties.lastIndexOf(loser.abrv) >= 0) {
                winner.ties.splice(winner.ties.lastIndexOf(loser.abrv), 1);
            }

            if(loser.wins.lastIndexOf(winner.abrv) >= 0) {
                loser.wins.splice(loser.wins.lastIndexOf(winner.abrv), 1);
            } else if(loser.loses.lastIndexOf(winner.abrv) >= 0) {
                loser.loses.splice(loser.loses.lastIndexOf(winner.abrv), 1);
            } else if (loser.ties.lastIndexOf(winner.abrv) >= 0) {
                loser.ties.splice(loser.ties.lastIndexOf(winner.abrv), 1);
            }
        }

        winner.wins.push(loser);
        loser.loses.push(winner);

        streak(winner, 'W');
        streak(loser, 'L');

        adjust(winner);
        adjust(loser);

        return  {
            type: GAME_RESULT,
            payload: { winner, loser }
        };
    } else {
        const { home, away } = result;

        if(pressed) {
            if(home.wins.lastIndexOf(away.abrv) >= 0) {
                home.wins.splice(home.wins.lastIndexOf(away.abrv), 1);
            } else if(home.loses.lastIndexOf(away.abrv) >= 0) {
                home.loses.splice(home.loses.lastIndexOf(away.abrv), 1);
            } else if (home.ties.lastIndexOf(away.abrv) >= 0) {
                home.ties.splice(home.ties.lastIndexOf(away.abrv), 1);
            }

            if(away.wins.lastIndexOf(home.abrv) >= 0) {
                away.wins.splice(away.wins.lastIndexOf(home.abrv), 1);
            } else if(away.loses.lastIndexOf(home.abrv) >= 0) {
                away.loses.splice(away.loses.lastIndexOf(home.abrv), 1);
            } else if (away.ties.lastIndexOf(home.abrv) >= 0) {
                away.ties.splice(away.ties.lastIndexOf(home.abrv), 1);
            }
        }

        home.ties.push(away);
        away.ties.push(home);

        streak(home, 'T');
        streak(away, 'T');

        adjust(home);
        adjust(away);

        return{
            type: GAME_RESULT_TIE,
            payload: { home, away }
        };
    }
}

const streak = (team, WLT) => {
    if(WLT === 'W') {
        if(team.streak.includes('W')) {
            const num = team.streak.split('')[1];
            team.streak = `W${parseInt(num, 10)+1}`;
        } else {
            team.streak = 'W1';
        }
    } else if(WLT === 'L') {
        if(team.streak.includes('L')) {
            const num = team.streak.split('')[1];
            team.streak = `L${parseInt(num, 10)+1}`;
        } else {
            team.streak = 'L1';
        }
    } else if(WLT === 'T') {
        if(team.streak.includes('T')) {
            const num = team.streak.split('')[1];
            team.streak = `T${parseInt(num, 10)+1}`;
        } else {
            team.streak = 'T1';
        }
    }
};

const adjust = (team) => {
    team.record = getRecord(team);
    team.pct = getPCT(team);
    team.divRecord = getDivRecord_Pct(team)[0];
    team.divPct = getDivRecord_Pct(team)[1];
    team.confRecord = getConfRecord_Pct(team)[0];
    team.confPct = getConfRecord_Pct(team)[1];
    //Add more functions here to adjust teams per victories and loses
};


/** FUNCTIONS FOR ADJUST **/


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
};

/**
 * @return array
 * element 0 is the record
 * element 1 is the pct
 */
const getDivRecord_Pct = (team) => {
    console.log();
    let wins = 0;
    let loses = 0;
    let ties = 0;
    let pct, record;

    for(let i = 0; i < team.wins.length; i++) {
        if(team.wins[i].Confrence === team.Confrence && team.wins[i].Division === team.Division)
            wins++;
    }
    for(let i = 0; i < team.ties.length; i++) {
        if(team.ties[i].Confrence === team.Confrence && team.ties[i].Division === team.Division)
            ties++;
    }
    for(let i = 0; i < team.loses.length; i++) {
        if(team.loses[i].Confrence === team.Confrence && team.loses[i].Division === team.Division)
            loses++;
    }

    record = ties === 0 ? `${wins}-${loses}`:`${wins}-${loses}-${ties}`;
    if(wins+loses+ties === 0)
        pct = '0.0000';
    else
        pct = ((wins+(ties/2))/(wins+loses+ties)).toFixed(4);

    return [record, pct];
};

/**
 * @return array
 * element 0 is the record
 * element 1 is the pct
 */
const getConfRecord_Pct = (team) => {
    console.log();
    let wins = 0;
    let loses = 0;
    let ties = 0;
    let pct, record;

    for(let i = 0; i < team.wins.length; i++) {
        if(team.wins[i].Confrence === team.Confrence)
            wins++;
    }
    for(let i = 0; i < team.ties.length; i++) {
        if(team.ties[i].Confrence === team.Confrence)
            ties++;
    }
    for(let i = 0; i < team.loses.length; i++) {
        if(team.loses[i].Confrence === team.Confrence)
            loses++;
    }

    record = ties === 0 ? `${wins}-${loses}`:`${wins}-${loses}-${ties}`;
    if(wins+loses+ties === 0)
        pct = '0.0000';
    else
        pct = ((wins+(ties/2))/(wins+loses+ties)).toFixed(4);

    return [record, pct];
};
