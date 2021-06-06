import { GAME_RESULT, GAME_RESULT_TIE } from './types';

export function gameResult(result, gameWeek, tie) {
    // console.log(result, pressed, tie);

    if(!tie) {
        const { winner, loser } = result;

        // const l_team = { Division: loser.Division, Confrence: loser.Confrence };
        // const w_team = { Division: winner.Division, Confrence: winner.Confrence };
        //switch out with loser and winner, respectively based on l and w to prevent possible infinite nesting of state
       
        winner.wins[gameWeek-1] = loser;
        winner.loses[gameWeek-1] = null;
        winner.ties[gameWeek-1] = null;

        loser.wins[gameWeek-1] =  null;
        loser.loses[gameWeek-1] =  winner;     
        loser.ties[gameWeek-1] =  null;

        // streak(winner, 'W');
        // streak(loser, 'L');

        adjust(winner);
        adjust(loser);

        return  {
            type: GAME_RESULT,
            payload: { winner, loser }
        };
    } else {
        const { home, away } = result;

        // const h_team = { Division: home.Division, Confrence: home.Confrence };
        // const a_team = { Division: away.Division, Confrence: away.Confrence };
         //switch out with home and away, respectively based on h and a to prevent possible infinite nesting of state

        home.ties[gameWeek-1] = away;
        home.wins[gameWeek-1] = null;
        home.loses[gameWeek-1] = null;

        away.ties[gameWeek-1] = home;
        away.wins[gameWeek-1] = null;
        away.loses[gameWeek-1] = null;

        // streak(home, 'T');
        // streak(away, 'T');

        adjust(home);
        adjust(away);

        return{
            type: GAME_RESULT_TIE,
            payload: { home, away }
        };
    }
}

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
        if(W[i].Confrence === team.Confrence && W[i].Division === team.Division)
            wins++;
    }
    for(let i = 0; i < T.length; i++) {
        if(T[i].Confrence === team.Confrence && T[i].Division === team.Division)
            ties++;
    }
    for(let i = 0; i < L.length; i++) {
        if(L[i].Confrence === team.Confrence && L[i].Division === team.Division)
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
        if(W[i].Confrence === team.Confrence)
            wins++;
    }
    for(let i = 0; i < T.length; i++) {
        if(T[i].Confrence === team.Confrence)
            ties++;
    }
    for(let i = 0; i < L.length; i++) {
        if(L[i].Confrence === team.Confrence)
            loses++;
    }

    record = ties === 0 ? `${wins}-${loses}`:`${wins}-${loses}-${ties}`;
    if(wins+loses+ties === 0)
        pct = '0.0000';
    else
        pct = ((wins+(ties/2))/(wins+loses+ties)).toFixed(4);

    return [record, pct];
};
