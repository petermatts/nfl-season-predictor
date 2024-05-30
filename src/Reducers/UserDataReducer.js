import {
    UPDATE_UGAMELIST,
    GET_GAMELIST,
    UPDATE_GAMEPICKS,
    ADD_BYE,
    NAME,
    LOAD_SAVE,
    SAVE_SAVE,
    SEASON_CHANGE
} from './../Actions/types';
import { unpicked, homewin, awaywin, tiegame, win, loss, tie } from './../Actions/Constants';

const list = () => new Array(272).fill(unpicked, 0,272);
const grid = () => {
    const arr = new Array(32);
    for(let i = 0; i < arr.length; i++)
        arr[i] = new Array(18).fill(unpicked, 0, 18);
    return arr;
};

const defaultList = list();
const defaultGrid = grid();

const INITIAL_STATE = {
    gamelist: defaultList, //Important gamelist and gamepicks are parrallel
    gamepicks: null, 
    gamegrid: defaultGrid,
    gamespicked: 0,
    name: null,

    saveStatus: null,
    saveData: null
};

const UserDataReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case UPDATE_UGAMELIST:
            const { home, away } = action.payload.gridLocs;
            const { pick, week, key } = action.payload;

            const newList = state.gamelist;
            newList[key] = pick;
            const gamespicked = newList.filter((p) => p!==0).length;

            const newGrid = state.gamegrid;
            if(pick === homewin) {
                newGrid[home][week-1] = win;
                newGrid[away][week-1] = loss;
            } else if(pick === awaywin) {
                newGrid[home][week-1] = loss;
                newGrid[away][week-1] = win;
            } else if(pick === tiegame) {
                newGrid[home][week-1] = tie;
                newGrid[away][week-1] = tie;
            }

            return { ...state, gamelist: newList, gamegrid: newGrid, gamespicked };
        case GET_GAMELIST:
            return { ...state, gamepicks: action.payload };
        case UPDATE_GAMEPICKS:
            const newGamePicks = state.gamepicks;
            newGamePicks[action.payload.key] = action.payload.gamepick;
            return { ...state, gamepicks: newGamePicks };
        case ADD_BYE:
            const tempGrid = state.gamegrid;
            tempGrid[action.payload.pickTeam] = action.payload.teamSchedulePicks;
            return { ...state, gamegrid: tempGrid };
        case NAME:
            return { ...state, name: action.payload };
        case LOAD_SAVE:
            return {
                ...state,
                saveData: action.payload.save,
                saveStatus: action.payload.saveName,
                gamespicked: 0,
                gamelist: list(),
                gamegrid: grid()
            };
        case SAVE_SAVE:
            return { ...state, saveData: action.payload };
        case SEASON_CHANGE:
            const newState = {
                ...state,
                gamelist: list(),
                gamegrid: grid(),
                gamepicks: null,
                gamespicked: 0,

                name: action.payload,
                saveStatus: null,
                saveData: null
            };
            console.log(newState);
            return newState;
        default:
            return state;
    }
};

export default UserDataReducer;
