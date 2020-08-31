import { GAME_RESULT, GAME_RESULT_TIE } from './types';

export function gameResult(result, pressed, gameWeek, gameCode, tie) {
    console.log(result, pressed, tie);

    if(!tie) {
        const { winner, loser } = result;
       
        winner.wins[gameWeek-1] = loser;
        winner.loses[gameWeek-1] = null;
        winner.ties[gameWeek-1] = null;

        loser.wins[gameWeek-1] =  null;
        loser.loses[gameWeek-1] =  winner;     
        loser.ties[gameWeek-1] =  null;

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

        home.ties[gameWeek-1] = away;
        home.wins[gameWeek-1] = null;
        home.loses[gameWeek-1] = null;

        away.ties[gameWeek-1] = home;
        away.wins[gameWeek-1] = null;
        away.loses[gameWeek-1] = null;

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
    const wins = team.wins.filter(game => game !== null).length;
    const loses = team.loses.filter(game => game !== null).length;
    const ties = team.ties.filter(game => game !== null).length;
    return ties === 0 ? `${wins}-${loses}`:`${wins}-${loses}-${ties}`;
};

const getPCT = (team) => {
    const wins = team.wins.filter(game => game !== null).length;
    const loses = team.loses.filter(game => game !== null).length;
    const ties = team.ties.filter(game => game !== null).length;
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
    const W = team.wins.filter(game => game !== null);
    const T = team.ties.filter(game => game !== null);
    const L = team.loses.filter(game => game !== null);
    let wins = 0;
    let loses = 0;
    let ties = 0;
    let pct, record;

    for(let i = 0; i < W.length; i++) {
        if(team.wins[i].Confrence === team.Confrence && team.wins[i].Division === team.Division)
            wins++;
    }
    for(let i = 0; i < T.length; i++) {
        if(team.ties[i].Confrence === team.Confrence && team.ties[i].Division === team.Division)
            ties++;
    }
    for(let i = 0; i < L.length; i++) {
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
    const W = team.wins.filter(game => game !== null);
    const T = team.ties.filter(game => game !== null);
    const L = team.loses.filter(game => game !== null);
    let wins = 0;
    let loses = 0;
    let ties = 0;
    let pct, record;

    for(let i = 0; i < W.length; i++) {
        if(team.wins[i].Confrence === team.Confrence)
            wins++;
    }
    for(let i = 0; i < T.length; i++) {
        if(team.ties[i].Confrence === team.Confrence)
            ties++;
    }
    for(let i = 0; i < L.length; i++) {
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
