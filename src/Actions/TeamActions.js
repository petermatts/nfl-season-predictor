import { GAME_RESULT, GAME_RESULT_TIE } from './types';

export const gameResult = (result, tie) => (dispatch, getState) => {
    // console.log(result, pressed, tie);
    // const state = getState();
    // console.log(state);

    if(!tie) {
        const { winner, loser } = result;
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
        home.ties.push(away.abrv);
        away.ties.push(home.abrv);

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
    const W = team.wins;
    const T = team.ties;
    const L = team.loses;
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
    const W = team.wins;
    const T = team.ties;
    const L = team.loses;
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
