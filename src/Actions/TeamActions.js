import { GAME_RESULT, GAME_RESULT_TIE, UPDATE_GAMEPICKS, UPDATE_SOV } from './types';
import { teamHash } from '../Teams/Team';
import { tiegame, win, loss, tie } from './../Actions/Constants';

export const gameResult = (result, gameId) => (dispatch, getState) => {
    const state = getState();
    const { gamelist, gamegrid } = state.userdata;
    const isTie = gamelist[gameId]===tiegame;
    const gamepick = state.userdata.gamepicks[gameId];

    if(!isTie) {
        const { winner, loser } = result;

        winner.wins = [];
        winner.loses = [];
        winner.ties = [];
        loser.wins = [];
        loser.loses = [];
        loser.ties = [];

        const w_hash = teamHash(winner.abrv);
        const l_hash = teamHash(loser.abrv);

        for(let i = 0; i < gamegrid[w_hash].length; i++) {
            switch(gamegrid[w_hash][i]) {
                case win:
                    winner.wins.push(otherTeam(gamepick, winner.abrv));
                    break;
                case loss:
                    winner.loses.push(otherTeam(gamepick, winner.abrv));
                    break;
                case tie:
                    winner.ties.push(otherTeam(gamepick, winner.abrv));
                    break;
                default:
                    continue;
            }
        }

        for(let i = 0; i < gamegrid[l_hash].length; i++) {
            switch(gamegrid[l_hash][i]) {
                case win:
                    loser.wins.push(otherTeam(gamepick, winner.abrv));
                    break;
                case loss:
                    loser.loses.push(otherTeam(gamepick, winner.abrv));
                    break;
                case tie:
                    loser.ties.push(otherTeam(gamepick, winner.abrv));
                    break;
                default:
                    continue;
            }
        }

        gamepick.picked = true;
        gamepick.winner = winner;
        gamepick.loser = loser;

        adjust(winner, state);
        adjust(loser, state);
        updateSOV(winner, state.NFL, dispatch);
        updateSOV(loser, state.NFL, dispatch);

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

        home.wins = [];
        home.loses = [];
        home.ties = [];
        away.wins = [];
        away.loses = [];
        away.ties = [];

        const h_hash = teamHash(home.abrv);
        const a_hash = teamHash(away.abrv);

        for(let i = 0; i < gamegrid[h_hash].length; i++) {
            switch(gamegrid[h_hash][i]) {
                case win:
                    home.wins.push(otherTeam(gamepick, home.abrv));
                    break;
                case loss:
                    home.loses.push(otherTeam(gamepick, home.abrv));
                    break;
                case tie:
                    home.ties.push(otherTeam(gamepick, home.abrv));
                    break;
                default:
                    continue;
            }
        }

        for(let i = 0; i < gamegrid[a_hash].length; i++) {
            switch(gamegrid[a_hash][i]) {
                case win:
                    away.wins.push(otherTeam(gamepick, away.abrv));
                    break;
                case loss:
                    away.loses.push(otherTeam(gamepick, away.abrv));
                    break;
                case tie:
                    away.ties.push(otherTeam(gamepick, away.abrv));
                    break;
                default:
                    continue;
            }
        }

        gamepick.picked = true;
        gamepick.winner = null;
        gamepick.loser = null;

        adjust(home, state);
        adjust(away, state);
        updateSOV(home, state.NFL, dispatch);
        updateSOV(away, state.NFL, dispatch);

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

const otherTeam = (game, thisTeam) => {
    if(game.away === thisTeam)
        return game.home;
    else if(game.home === thisTeam)
        return game.away;
    else
        return null; //must be an error
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
    const loses = team.loses;
    for(let i = 0; i < loses.length; i++) {
        const otherTeam = League[loses[i]];
        const wins = otherTeam.wins;
        const len = wins.length;
        let sum = 0;
        
        for(let j = 0; j < wins.length; j++) {
            if(wins[j]===team.abrv)
                sum += parseFloat(team.pct);
            else
                sum += parseFloat(League[wins[j]].pct);
        }
        otherTeam.SOV = parseFloat((sum/len).toFixed(3));
        
        dispatch({
            type: UPDATE_SOV,
            payload: { abrv: loses[i], otherTeam }
        });
    }
};
