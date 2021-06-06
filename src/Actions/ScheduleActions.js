import firebase from 'firebase';
import { GET_GAMEGRID, GET_GAMELIST, GET_SCHEDULE } from './types';

export const getGameGrid = (year) => {
    firebase.database().ref(`/data/${year}/GameGrid`).once('value').then((snapshot) => {
        console.log(snapshot.val());
        return { type: GET_GAMEGRID, payload: snapshot.val() };
    })
    .catch(() => {
        console.log('Failed to read data');
    });
}

export const getGameList = (year) => {
    firebase.database().ref(`/data/${year}/GameList`).once('value').then((snapshot) => {
        console.log(snapshot.val());
        return { type: GET_GAMELIST, payload: snapshot.val() };
    })
    .catch(() => {
        console.log('Failed to read data');
    });
}

export const getSchedule = (year) => {
    firebase.database().ref(`/data/${year}/Schedule`).once('value').then((snapshot) => {
        console.log(snapshot.val());
        return { type: GET_SCHEDULE, payload: snapshot.val() };
    })
    .catch(() => {
        console.log('Failed to read data');
    });
}

//! handle errors if can't read data
