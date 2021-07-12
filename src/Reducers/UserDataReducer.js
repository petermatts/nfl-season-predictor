import {
    UPDATE_UGAMELIST,
    GET_GAMELIST,
    UPDATE_GAMEPICKS,
    ADD_BYE,
    NAME,
    LOAD_SAVE
} from './../Actions/types';
import { unpicked, homewin, awaywin, tiegame, win, loss, tie } from './../Actions/Constants';

const defaultList = new Array(272).fill(unpicked, 0,272);
const defaultGrid = new Array(32);
for(let i = 0; i < defaultGrid.length; i++)
    defaultGrid[i] = new Array(18).fill(unpicked, 0, 18);

const INITIAL_STATE = {
    gamelist: defaultList, //Important gamelist and gamepicks are parrallel
    gamepicks: null, 
    gamegrid: defaultGrid,
    gamespicked: 0,
    name: null,

    saveStatus: null,
    saveData: null
};

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case UPDATE_UGAMELIST:
            const { home, away } = action.payload.gridLocs;
            const { pick, week, key } = action.payload;

            const newList = state.gamelist;
            newList[key] = pick;
            const gamespicked = newList.filter((p) => p!==0).length;

            const newGrid = state.gamegrid;
            if(pick === homewin) {
                console.log('homewin');
                newGrid[home][week-1] = win;
                newGrid[away][week-1] = loss;
            } else if(pick === awaywin) {
                console.log('awaywin', home);
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
            return { ...state, saveData: action.payload.save, saveStatus: action.payload.saveName };
        default:
            return state;
    }
}
