import { GAME_RESULT, GAME_RESULT_TIE, UPDATE_GAMEPICKS, UPDATE_SOV } from './types';
import { tiegame } from './../Actions/Constants';

export const gameResult = (result, gameId) => (dispatch, getState) => {
    // console.log(result, pressed, tie);
    const state = getState();
    const isTie = state.userdata.gamelist[gameId]===tiegame;
    const gamepick = state.userdata.gamepicks[gameId];

    if(!isTie) {
        const { winner, loser } = result;
        
        if(gamepick.picked) {
            //remove last existence of other team from wins, loses, or ties array
            winner.loses.splice(winner.loses.lastIndexOf(loser.abrv), 1);
            loser.wins.splice(loser.wins.lastIndexOf(winner.abrv), 1);
            winner.ties.splice(winner.ties.lastIndexOf(loser.abrv), 1);
            loser.ties.splice(loser.ties.lastIndexOf(winner.abrv), 1);
        }

        winner.wins.push(loser.abrv);
        loser.loses.push(winner.abrv);

        gamepick.picked = true;
        gamepick.winner = winner;
        gamepick.loser = loser;

        adjust(winner, state);
        adjust(loser, state);
        // updateSOV(winner, state.NFL, dispatch);
        // updateSOV(loser, state.NFL, dispatch);

        dispatch({
            type: UPDATE_GAMEPICKS,
            payload: { key: gameId, gamepick }
        });

        return  {
            type: GAME_RESULT,
            payload: { winner, loser }
        };
        
    } else {
        const { home, away } = result;

        if(gamepick.picked) {
            //remove last existence of other team from wins, loses, or ties array
            home.loses.splice(home.loses.lastIndexOf(away.abrv), 1);
            away.wins.splice(away.wins.lastIndexOf(home.abrv), 1);
            home.wins.splice(home.wins.lastIndexOf(away.abrv), 1);
            away.loses.splice(away.loses.lastIndexOf(home.abrv), 1);
            //? unneccessary
            // home.ties.splice(home.ties.lastIndexOf(away.abrv), 1);
            // away.ties.splice(away.ties.lastIndexOf(home.abrv), 1);
        }

        home.ties.push(away.abrv);
        away.ties.push(home.abrv);

        gamepick.picked = true;
        gamepick.winner = null;
        gamepick.loser = null;

        adjust(home, state);
        adjust(away, state);
        // updateSOV(home, state.NFL, dispatch);
        // updateSOV(away, state.NFL, dispatch);

        dispatch({
            type: UPDATE_GAMEPICKS,
            payload: { key: gameId, gamepick }
        });

        return{
            type: GAME_RESULT_TIE,
            payload: { home, away }
        };
    }
}

const adjust = (team, state) => {
    team.record = getRecord(team);
    team.pct = getPCT(team);
    const divInfo = getDivRecord_Pct(team, state.NFL);
    const confInfo = getConfRecord_Pct(team, state.NFL);
    team.divRecord = divInfo[0];
    team.divPct = divInfo[1];
    team.confRecord = confInfo[0];
    team.confPct = confInfo[1];

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
const getDivRecord_Pct = (team, League) => {
    const W = team.wins;
    const T = team.ties;
    const L = team.loses;
    const confrence = team.Confrence;
    const division = team.Division;
    let wins = 0;
    let loses = 0;
    let ties = 0;
    let pct, record;

    for(let i = 0; i < W.length; i++) {
        if(League[W[i]].Confrence === confrence && League[W[i]].Division === division)
            wins++;
    }
    for(let i = 0; i < T.length; i++) {
        if(League[T[i]].Confrence === confrence && League[T[i]].Division === division)
            ties++;
    }
    for(let i = 0; i < L.length; i++) {
        if(League[L[i]].Confrence === confrence && League[L[i]].Division === division)
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
const getConfRecord_Pct = (team, League) => {
    const W = team.wins;
    const T = team.ties;
    const L = team.loses;
    const confrence = team.Confrence;
    let wins = 0;
    let loses = 0;
    let ties = 0;
    let pct, record;

    for(let i = 0; i < W.length; i++) {
        if(League[W[i]].Confrence === confrence)
            wins++;
    }
    for(let i = 0; i < T.length; i++) {
        if(League[T[i]].Confrence === confrence)
            ties++;
    }
    for(let i = 0; i < L.length; i++) {
        if(League[L[i]].Confrence === confrence)
            loses++;
    }

    record = ties === 0 ? `${wins}-${loses}`:`${wins}-${loses}-${ties}`;
    if(wins+loses+ties === 0)
        pct = '0.0000';
    else
        pct = ((wins+(ties/2))/(wins+loses+ties)).toFixed(4);

    return [record, pct];
};

const updateSOV = (team, League, dispatch) => {
    //! needs work
    const loses = team.loses;
    for(let i = 0; i < loses.length; i++) {
        const wins = League[loses[i]].wins;
        const len = wins.length;
        let sum = 0;
        for(let j = 0; j < wins.length; j++) {
            if(wins[j]===team.abrv)
                sum += team.pct;
            else
                sum += League[wins[j]].pct;
        }
        const SOV = (sum/len).toFixed(3);
        
        dispatch({
            type: UPDATE_SOV,
            payload: { abrv: loses[i], SOV}
        });
    }
};
