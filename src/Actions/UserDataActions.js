/* eslint-disable eqeqeq */
import { UPDATE_UGAMELIST, ADD_BYE, NAME, LOAD_SAVE, SAVE_SAVE, SEASON_CHANGE, RESET_LEAGUE } from './types';
import firebase from 'firebase';
// import { getGameList, gameResult } from '../Actions';
import { getGameList, getGameGrid, getSchedule, gameResult, updateSeason } from '../Actions';
import { unpicked, homewin, awaywin, tiegame } from './Constants';
import { teamHash } from '../Teams/Team';

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

export const addBye = (pickTeam, teamSchedulePicks) => {
    return {
        type: ADD_BYE,
        payload: { pickTeam, teamSchedulePicks }
    };
};

/**
 * @param {String} name of username
 * null if logging out user
 */
export const name = (name) => {
    return {
        type: NAME,
        payload: name
    };
}

export const loadSave = (saveName, season) => async (dispatch, getState) => {
    const { uid } = firebase.auth().currentUser;
    console.log(season);

    await firebase.database().ref(`/users/${uid}/saves/${season}/${saveName}`).once('value')
        .then((snapshot) => {
            //updates saveData and saveStatus, clears rest of userdata state
            dispatch({
                type: LOAD_SAVE,
                payload: { save: snapshot.val(), saveName: `/${season}/${saveName}`, season }
            });
            // console.log(snapshot.val());
        })
        .catch(() => {
            console.log('Failed to read data');
        });

    dispatch(updateSeason(season));
    await dispatch(getGameList(season));
    await dispatch(getGameGrid(season));
    await dispatch(getSchedule(season))
    // console.log(getState().userdata);

    const state = getState();
    const { NFL } = state;
    const { saveData } = state.userdata;
    const { gamelist, gamegrid } = state.schedule;
    // console.log(saveData);

    //repick everything from save in database
    for(let i = 0; i < saveData.length; i++) {
        const pick = saveData[i];
        const game = gamelist[i];
        // console.log(pick, homewin, pick == homewin);
        const home = NFL[game.home];
        const away = NFL[game.away];
        const { week, gridLoc } = getGridLocations(i, home, away, gamegrid);

        if(pick == unpicked)
            continue;
        else if(pick == homewin) {
            dispatch(updateUserGamePicks(i, homewin, gridLoc, week));
            dispatch(gameResult({ winner: home, loser: away }, i));
        } else if(pick == awaywin) {
            dispatch(updateUserGamePicks(i, awaywin, gridLoc, week));
            dispatch(gameResult({ winner: away, loser: home }, i));
        } else if(pick == tiegame) {
            dispatch(updateUserGamePicks(i, tiegame, gridLoc, week));
            dispatch(gameResult({ home, away }, i));
        }
    }
}

function getGridLocations(gameId, home, away, grid) {
    const h = teamHash(home.abrv);
    const a = teamHash(away.abrv);
    let week = null;

    if(grid[h].length === grid[a].length) {
        const len = grid[h].length;
        for(let i = 0; i < len; i++) {
            if(grid[h][i] === grid[a][i] && grid[h][i] === gameId) {
                week = i+1;
                break;
            }
        }
    }

    return { week, gridLoc: { home: h, away: a }};
};

export const saveSave = () => async (dispatch, getState) => {
    const state = getState();
    const { season } = state.settings;
    const { gamelist, saveStatus } = state.userdata;
    const saveName = saveStatus.substring(saveStatus.lastIndexOf('/')+1);
    const newData = gamelist.join().replaceAll(',','');

    // console.log(season);
    // console.log(newData);
    // console.log(saveName);

    const { uid } = firebase.auth().currentUser;

    await firebase.database().ref(`/users/${uid}/saves/${season}/${saveName}`).set(newData);

    dispatch({ 
        type: SAVE_SAVE,
        payload: newData
    });
};

export const seasonChange = () => async (dispatch, getState) => {
    const state = getState();
    const n = state.userdata.name;
    const season = state.settings.season;

    dispatch({ type: RESET_LEAGUE, payload: season });

    dispatch({
        type: SEASON_CHANGE,
        payload: n
    });
};
